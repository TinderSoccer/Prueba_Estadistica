import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

// ====================================================================================================
// PASO 1: Componente REUTILIZABLE para Análisis Descriptivo (VERSIÓN MEJORADA CON COLOR Y ESPAÑOL)
// ====================================================================================================
const VariableAnalysis = ({ title, data, classification, color = 'indigo' }) => {
  const varClass =
    classification.cualitativas.find(v => v.nombre === title) ||
    classification.cuantitativas.find(v => v.nombre === title);

  const tableHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  // Mapeo de encabezados de inglés a español
  const headerTranslations = {
    name: 'Categoría',
    value: 'Frecuencia Absoluta',
    percentage: 'Frecuencia Relativa (%)',
    range: 'Rango',
    students: 'N° de Estudiantes',
    area: 'Área de Conocimiento',
    duration: 'Duración (Semestres)',
    programs: 'N° de Programas',
    matricula: 'Frecuencia Matrícula',
    arancel: 'Frecuencia Arancel'
  };

  const colorStyles = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', pillBg: 'bg-blue-200', pillText: 'text-blue-800' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', pillBg: 'bg-purple-200', pillText: 'text-purple-800' },
    green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', pillBg: 'bg-green-200', pillText: 'text-green-800' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700', pillBg: 'bg-orange-200', pillText: 'text-orange-800' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700', pillBg: 'bg-pink-200', pillText: 'text-pink-800' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-700', pillBg: 'bg-indigo-200', pillText: 'text-indigo-800' },
  };
  const theme = colorStyles[color] || colorStyles.indigo;

  return (
    <div className="mt-8 border-t-4 border-gray-200 pt-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Análisis Descriptivo de la Variable</h3>
      <div className={`${theme.bg} ${theme.border} border-l-4 p-6 rounded-xl mb-6`}>
        <p className="text-xl font-bold text-gray-900">
          Variable: <span className={theme.text}>{title}</span>
        </p>
        {varClass && (
          <p className="text-xl font-bold text-gray-900 mt-2 flex items-center gap-x-3">
            Clasificación:
            <span className={`${theme.pillBg} ${theme.pillText} text-sm font-bold px-3 py-1 rounded-full`}>
              {varClass.cualitativa ? 'Cualitativa' : 'Cuantitativa'}
            </span>
            <span className={`${theme.pillBg} ${theme.pillText} text-sm font-bold px-3 py-1 rounded-full`}>
              {varClass.tipo}
            </span>
          </p>
        )}
      </div>
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Tabla de Frecuencia</h4>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-lg text-left">
          <thead className={`bg-gray-800 text-white font-bold capitalize`}>
            <tr>
              {tableHeaders.map(header => <th key={header} className="p-4">{headerTranslations[header] || header}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b bg-white even:bg-slate-50 hover:bg-gray-100">
                {tableHeaders.map(header => (
                  <td key={`${index}-${header}`} className="p-4 font-semibold">
                    {typeof row[header] === 'number' ? row[header].toLocaleString('es-CL') : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente de tarjeta de estadísticas
const StatCard = ({ icon, label, value, sublabel, color = 'blue' }) => {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[color]} text-white p-6 rounded-2xl shadow-lg`}>
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-base font-bold opacity-90 mb-2">{label}</p>
      <p className="text-4xl font-black mb-2">{value}</p>
      {sublabel && <p className="text-sm font-semibold opacity-90">{sublabel}</p>}
    </div>
  );
};

// Componente de caja de análisis
const InsightBox = ({ title, children, color = 'blue' }) => {
  const gradients = {
    blue: 'from-blue-50 to-blue-100 border-blue-500',
    purple: 'from-purple-50 to-purple-100 border-purple-500',
    green: 'from-green-50 to-green-100 border-green-500',
    orange: 'from-orange-50 to-orange-100 border-orange-500',
    pink: 'from-pink-50 to-pink-100 border-pink-500',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-500',
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[color]} border-l-4 p-8 rounded-lg shadow-sm`}>
      <h4 className="font-bold text-gray-900 mb-4 flex items-center text-2xl">
        <span className="mr-3 text-3xl">💡</span>
        {title}
      </h4>
      <div className="text-gray-800 text-lg leading-relaxed font-semibold space-y-2">
        {children}
      </div>
    </div>
  );
};

// Tooltip personalizado para gráficos
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-8 py-5 rounded-xl shadow-2xl border-2 border-gray-300">
        <p className="font-bold text-gray-900 text-xl mb-2">
          {payload[0].payload.name || payload[0].payload.range || payload[0].payload.area || payload[0].payload.duration || payload[0].name}
        </p>
        <p className="text-3xl font-black" style={{ color: payload[0].fill }}>
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function App() {
  const [activeTab, setActiveTab] = useState(-1);
  const [showIntro, setShowIntro] = useState(true);
  const [resumenPage, setResumenPage] = useState(0);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C'];
  const GENDER_COLORS = ['#EC4899', '#3B82F6'];

  // ====================================================================================================
  // DATOS ACTUALIZADOS SEGÚN LOS ARCHIVOS CSV PROPORCIONADOS
  // ====================================================================================================
  const genderData = [
    { name: 'Femenino', value: 3265, percentage: 56.33 },
    { name: 'Masculino', value: 2531, percentage: 43.67 }
  ];

  const ageRangeData = [
    { range: '15-19', students: 1187 },
    { range: '20-24', students: 2862 },
    { range: '25-29', students: 879 },
    { range: '30-34', students: 393 },
    { range: '35-39', students: 256 },
    { range: '40+', students: 219 }
  ];

  const institutionData = [
    { name: 'Universidades CRUCH', students: 3294 },
    { name: 'Centros de Formación Técnica', students: 1480 },
    { name: 'Institutos Profesionales', students: 877 },
    { name: 'Universidades Privadas', students: 145 }
  ];

  const modalityData = [
    { name: 'Presencial', value: 5821, percentage: 97.2 },
    { name: 'En Línea', value: 166, percentage: 2.8 }
  ];

  const scheduleData = [
    { name: 'Diurno', students: 4245, percentage: 60.9 },
    { name: 'Vespertino', students: 1689, percentage: 24.2 },
    { name: 'Ejecutivo', students: 1053, percentage: 15.1 }
  ];

  const knowledgeAreasData = [
    { area: 'Salud', students: 1501 },
    { area: 'Tecnología', students: 1331 },
    { area: 'Administración y Comercio', students: 1221 },
    { area: 'Educación', students: 653 },
    { area: 'Ciencias Sociales', students: 531 },
    { area: 'Derecho', students: 191 },
    { area: 'Agropecuaria', students: 163 },
    { area: 'Arte y Arquitectura', students: 132 },
    { area: 'Ciencias Básicas', students: 73 }
  ];

  const durationData = [
    { duration: '4-5 sem', programs: 234, percentage: 9.8 },
    { duration: '6-7 sem', programs: 456, percentage: 19.1 },
    { duration: '8-9 sem', programs: 789, percentage: 33.1 },
    { duration: '10 sem', programs: 821, percentage: 34.4 },
    { duration: '11-14 sem', programs: 367, percentage: 15.4 }
  ];

  const costsData = [
    { range: '$0-$137k', matricula: 312, arancel: 234 },
    { range: '$137k (Moda)', matricula: 789, arancel: 456 },
    { range: '$138k-$500k', matricula: 445, arancel: 389 },
    { range: '$500k-$2.2M', matricula: 334, arancel: 678 },
    { range: '$2.2M-$3.5M', matricula: 289, arancel: 823 },
    { range: '$3.5M+', matricula: 123, arancel: 534 }
  ];
  
  const variableClassification = {
    cuantitativas: [
      { nombre: 'Edad', tipo: 'Discreta', cualitativa: false },
      { nombre: 'N° Estudiantes / Programas', tipo: 'Discreta', cualitativa: false },
      { nombre: 'Duración Carrera (semestres)', tipo: 'Discreta', cualitativa: false },
      { nombre: 'Monto Matrícula', tipo: 'Continua', cualitativa: false },
      { nombre: 'Monto Arancel', tipo: 'Continua', cualitativa: false },
      { nombre: 'Porcentaje', tipo: 'Continua', cualitativa: false }
    ],
    cualitativas: [
      { nombre: 'Género', tipo: 'Nominal', cualitativa: true },
      { nombre: 'Tipo de Institución', tipo: 'Nominal', cualitativa: true },
      { nombre: 'Modalidad de Estudio', tipo: 'Nominal', cualitativa: true },
      { nombre: 'Jornada', tipo: 'Nominal', cualitativa: true },
      { nombre: 'Área de Conocimiento', tipo: 'Nominal', cualitativa: true },
      { nombre: 'Rango de Edad', tipo: 'Ordinal', cualitativa: true },
      { nombre: 'Duración de Carreras', tipo: 'Ordinal', cualitativa: true },
      { nombre: 'Rango de Costos', tipo: 'Ordinal', cualitativa: true }
    ]
  };

  const tabs = [
    { name: '👥 Género', icon: '👥' },
    { name: '🎂 Edad', icon: '🎂' },
    { name: '🏛️ Instituciones', icon: '🏛️' },
    { name: '💻 Modalidad', icon: '💻' },
    { name: '📚 Áreas', icon: '📚' },
    { name: '⏱️ Duración', icon: '⏱️' },
    { name: '💰 Costos', icon: '💰' },
    { name: '📊 Resumen', icon: '📊' }
  ];

  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <text x={x + width / 2} y={y - 10} fill="#1e293b" textAnchor="middle" fontSize={20} fontWeight="900">
        {value.toLocaleString('es-CL')}
      </text>
    );
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
      if (showIntro) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          setShowIntro(false);
          setActiveTab(0);
        }
      } else {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          if (activeTab === 7) {
            if (resumenPage === 0) {
              setResumenPage(1);
            } else {
              setResumenPage(0);
              setActiveTab(0);
            }
          } else {
            setActiveTab((prev) => (prev + 1) % 8);
            setResumenPage(0);
          }
        } else if (e.key === 'ArrowLeft') {
          if (activeTab === 7) {
            if (resumenPage === 1) {
              setResumenPage(0);
            } else {
              setActiveTab(6);
              setResumenPage(0);
            }
          } else if (activeTab === 0) {
            setShowIntro(true);
            setActiveTab(-1);
            setResumenPage(0);
          } else {
            setActiveTab((prev) => (prev - 1 + 8) % 8);
            setResumenPage(0);
          }
        } else if (e.key >= '1' && e.key <= '8') {
          setActiveTab(parseInt(e.key) - 1);
          setShowIntro(false);
          setResumenPage(0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showIntro, activeTab]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {showIntro ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-7xl px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fadeIn">
              Estadísticas de Educación Superior
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-bold mb-4 animate-slideInRight">
              Región de Magallanes y Antártica Chilena
            </p>
            <p className="text-xl md:text-2xl text-gray-600 font-semibold mb-8 animate-fadeIn">Año 2021</p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-3xl shadow-2xl mb-10 animate-scaleIn">
              <p className="text-4xl md:text-5xl font-black">5,796 estudiantes</p>
            </div>
            <div className="mb-10 animate-fadeIn">
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Integrantes</p>
              <p className="text-lg md:text-xl text-gray-600 font-semibold">Cristian Velasquez</p>
              <p className="text-lg md:text-xl text-gray-600 font-semibold">Ignacio Farias</p>
              <p className="text-lg md:text-xl text-gray-600 font-semibold">Julio Silva</p>
            </div>
            <div className="mt-10">
              <div className="text-gray-500 text-lg md:text-xl font-semibold animate-bounce mb-6">
                Presiona → o Espacio para comenzar
              </div>
              <button
                onClick={() => { setShowIntro(false); setActiveTab(0); }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-lg md:text-xl shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-slow"
              >
                Comenzar Presentación →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[96vw] mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-3 justify-center mb-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 ${activeTab === index
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                    : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105 border-2 border-gray-200'
                  }`}
              >
                <span className="mr-2 text-xl">{tab.icon}</span>
                {tab.name.replace(/^[^\s]+ /, '')}
              </button>
            ))}
          </div>

          {activeTab === 7 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              {resumenPage === 0 ? (
                <div className="flex-1 flex flex-col gap-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Medidas de Tendencia Central</h2>
                  <p className="text-center text-gray-500 text-xl mb-8 font-semibold">Página 1 de 2 - Presiona → para continuar</p>
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-8">📈 Estadísticas Centrales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <StatCard icon="🎂" label="Edad Promedio" value="24.42 años" sublabel="Mediana: 22 | Moda: 19" color="blue" />
                      <StatCard icon="⏱️" label="Duración Carrera" value="7.86 sem." sublabel="Mediana: 8 | Moda: 10" color="purple" />
                      <StatCard icon="💳" label="Matrícula Promedio" value="$145,774" sublabel="Mediana: $137.000 | Moda: $137.000" color="green" />
                      <StatCard icon="💰" label="Arancel Promedio" value="$2.693.403" sublabel="Mediana: $2.234.000 | Moda: $3.555.000" color="orange" />
                    </div>
                    <InsightBox title="Interpretación - Tendencia Central" color="blue">
                      <p>• La edad más frecuente es 19 años (recién egresados), pero la media de 24.42 indica presencia significativa de estudiantes mayores.</p>
                      <p>• Las carreras de 10 semestres (5 años) son las más comunes, aunque la media de 7.86 sugiere presencia importante de carreras técnicas cortas.</p>
                      <p>• El arancel modal ($3.555.000) es superior a la media ($2.693.403), sugiriendo concentración en programas de mayor costo.</p>
                    </InsightBox>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Medidas de Dispersión</h2>
                  <p className="text-center text-gray-500 text-xl mb-8 font-semibold">Página 2 de 2 - Presiona ← para volver</p>
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-8">📊 Variabilidad de Datos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <StatCard icon="📏" label="Rango Edad" value="40 años" sublabel="Desv. Estándar: 6.38 | CV: 26.14%" color="pink" />
                      <StatCard icon="📐" label="Rango Duración" value="13 sem." sublabel="Desv. Estándar: 3.1 | CV: 39.48%" color="indigo" />
                      <StatCard icon="📊" label="Rango Matrícula" value="$290.000" sublabel="Desv. Estándar: $50.895 | CV: 34.91%" color="purple" />
                      <StatCard icon="📈" label="Rango Arancel" value="$5.011.000" sublabel="Desv. Estándar: $1.070.871 | CV: 39.76%" color="orange" />
                    </div>
                    <InsightBox title="Interpretación - Dispersión" color="orange">
                      <p>• Alta variabilidad en costos (Coeficiente de Variación ~35-40%), indicando gran diversidad de programas.</p>
                      <p>• La duración muestra alta dispersión (CV 39.48%): desde técnicos cortos hasta carreras universitarias largas.</p>
                      <p>• Desviación estándar del arancel superior a $1.000.000 indica gran dispersión en precios.</p>
                    </InsightBox>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Distribución por Género</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={genderData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name}: ${percentage}%`} outerRadius={170} fill="#8884d8" dataKey="value" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <StatCard icon="👩" label="Mujeres" value="3.265" sublabel="56.33% del total" color="pink" />
                  <StatCard icon="👨" label="Hombres" value="2.531" sublabel="43.67% del total" color="blue" />
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis de Género" color="purple">
                    <p>• Hay una mayor proporción de mujeres (56.33%) que de hombres (43.67%) en la educación superior de la región.</p>
                    <p>• Esta tendencia refleja una feminización creciente en la matrícula de educación superior a nivel nacional.</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Género" data={genderData} classification={variableClassification} color="pink" />
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Rango de Edad</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageRangeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                      <XAxis dataKey="range" tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} height={70} />
                      <YAxis tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                      <Bar dataKey="students" fill="#4ECDC4" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                        {ageRangeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <StatCard icon="📊" label="Promedio" value="24.42 años" color="blue" />
                  <StatCard icon="📍" label="Mediana" value="22 años" color="purple" />
                  <StatCard icon="🎯" label="Moda" value="19 años" color="green" />
                  <StatCard icon="📏" label="Desv. Estándar" value="6.38 años" color="orange" />
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis Etario" color="blue">
                    <p>• El grupo de 20 a 24 años es el más numeroso, constituyendo el núcleo del estudiantado.</p>
                    <p>• La moda de 19 años indica un fuerte ingreso directo desde la educación secundaria.</p>
                    <p>• La desviación estándar de 6.38 años muestra una dispersión moderada pero significativa de las edades.</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Rango de Edad" data={ageRangeData} classification={variableClassification} color="blue" />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Tipo de Institución</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={institutionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                      <XAxis type="number" tick={{ fill: '#1e293b', fontSize: 20, fontWeight: 'bold' }} />
                      <YAxis dataKey="name" type="category" width={350} tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '20px', fontWeight: 'bold' }} />
                      <Bar dataKey="students" fill="#45B7D1" radius={[0, 12, 12, 0]} label={{ position: 'right', fontSize: 20, fontWeight: 'bold', fill: '#1e293b' }}>
                        {institutionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis Institucional" color="indigo">
                    <p>• Las Universidades del CRUCH dominan la matrícula regional, siendo la opción preferida.</p>
                    <p>• Los Centros de Formación Técnica y los Institutos Profesionales juntos forman un bloque importante de educación técnico-profesional.</p>
                    <p>• La presencia de Universidades Privadas es minoritaria en la región.</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Tipo de Institución" data={institutionData} classification={variableClassification} color="indigo" />
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Modalidad y Jornada</h2>
              <div className="flex-1 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Modalidad de Estudio</h3>
                  <div className="w-full h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={modalityData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name}: ${percentage}%`} outerRadius={150} fill="#8884d8" dataKey="value" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                          {modalityData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index]} />))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Jornada</h3>
                  <div className="w-full h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scheduleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 16, fontWeight: 'bold' }} />
                        <YAxis tick={{ fontSize: 16, fontWeight: 'bold' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="students" fill="#98D8C8" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                          {scheduleData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index + 2]} />))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <StatCard icon="🏫" label="Presencial" value="5.821" sublabel="97.2% del total" color="blue" />
                <StatCard icon="☀️" label="Diurno" value="4.245" sublabel="60.9% del total" color="orange" />
                <StatCard icon="🌙" label="Vespertino" value="1.689" sublabel="24.2% del total" color="purple" />
              </div>
              <div className="mt-8">
                <InsightBox title="Análisis Modalidad y Jornada" color="green">
                  <p>• La modalidad presencial es abrumadoramente dominante (97.2%), mostrando una clara preferencia regional.</p>
                  <p>• La jornada diurna es la más común, pero las jornadas vespertina y ejecutiva combinadas representan un segmento significativo (39.1%), probablemente estudiantes que trabajan.</p>
                </InsightBox>
              </div>
              <VariableAnalysis title="Modalidad de Estudio" data={modalityData} classification={variableClassification} color="green" />
              <VariableAnalysis title="Jornada" data={scheduleData} classification={variableClassification} color="orange" />
            </div>
          )}

          {activeTab === 4 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Áreas de Conocimiento</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={knowledgeAreasData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                      <XAxis dataKey="area" angle={-45} textAnchor="end" height={130} tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }} />
                      <YAxis tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                      <Bar dataKey="students" fill="#F7DC6F" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                        {knowledgeAreasData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis por Áreas" color="purple">
                    <p>• Salud, Tecnología y Administración y Comercio son las tres áreas dominantes, concentrando la mayoría de los estudiantes.</p>
                    <p>• Esto refleja las probables necesidades del mercado laboral y las vocaciones principales de la región.</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Área de Conocimiento" data={knowledgeAreasData} classification={variableClassification} color="purple" />
              </div>
            </div>
          )}

          {activeTab === 5 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Duración de Carreras</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={durationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                      <XAxis dataKey="duration" tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} height={70} />
                      <YAxis tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                      <Bar dataKey="programs" fill="#BB8FCE" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                        {durationData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis de Duración" color="indigo">
                    <p>• Las carreras de 10 semestres (5 años) son las más frecuentes, lo que indica un predominio de carreras profesionales universitarias.</p>
                    <p>• Existe una oferta diversificada, con una cantidad importante de programas técnicos de menor duración (4-5 semestres).</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Duración de Carreras" data={durationData} classification={variableClassification} color="pink" />
              </div>
            </div>
          )}

          {activeTab === 6 && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-screen py-10 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Costos</h2>
              <div className="flex-1 flex flex-col">
                <div className="w-full h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                      <XAxis dataKey="range" angle={-35} textAnchor="end" height={90} tick={{ fill: '#1e293b', fontSize: 13, fontWeight: 'bold' }} />
                      <YAxis tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                      <Bar dataKey="matricula" fill="#85C1E2" name="Matrícula" radius={[12, 12, 0, 0]} label={{ position: 'top', fontSize: 14, fontWeight: 'bold', fill: '#1e293b' }} />
                      <Bar dataKey="arancel" fill="#F8B739" name="Arancel" radius={[12, 12, 0, 0]} label={{ position: 'top', fontSize: 14, fontWeight: 'bold', fill: '#1e293b' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8">
                  <InsightBox title="Análisis de Costos" color="orange">
                    <p>• El rango de aranceles es muy amplio, lo que refleja la diversidad de la oferta educativa, desde carreras técnicas más económicas hasta programas universitarios de mayor costo.</p>
                    <p>• La moda del arancel es significativamente más alta que la mediana, lo que sugiere que un gran número de estudiantes está matriculado en las carreras de mayor valor.</p>
                  </InsightBox>
                </div>
                <VariableAnalysis title="Rango de Costos" data={costsData} classification={variableClassification} color="blue" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;