import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

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
  const [activeTab, setActiveTab] = useState(-1); // -1 = intro page, 0-7 = content sections
  const [showIntro, setShowIntro] = useState(true);
  const [resumenPage, setResumenPage] = useState(0); // 0 = Tendencia Central, 1 = Dispersión

  // Paleta de colores
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C'];
  const GENDER_COLORS = ['#EC4899', '#3B82F6'];

  // Datos estadísticos
  const genderData = [
    { name: 'Femenino', value: 3265, percentage: 56.33 },
    { name: 'Masculino', value: 2531, percentage: 43.67 }
  ];

  const ageRangeData = [
    { range: '15-19', students: 1247, percentage: 20.8 },
    { range: '20-24', students: 2834, percentage: 47.3 },
    { range: '25-29', students: 1456, percentage: 24.3 },
    { range: '30-34', students: 678, percentage: 11.3 },
    { range: '35-39', students: 345, percentage: 5.8 },
    { range: '40+', students: 427, percentage: 7.1 }
  ];

  const institutionData = [
    { name: 'Universidad de Magallanes (Consejo de Rectores)', students: 2456, percentage: 41.0 },
    { name: 'INACAP', students: 1834, percentage: 30.6 },
    { name: 'Universidades Privadas', students: 1123, percentage: 18.8 },
    { name: 'Otros Centros de Formación Técnica e Institutos Profesionales', students: 1574, percentage: 26.3 }
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
    { area: 'Salud', students: 1501, percentage: 25.1 },
    { area: 'Tecnología', students: 1331, percentage: 22.2 },
    { area: 'Administración y Comercio', students: 1221, percentage: 20.4 },
    { area: 'Educación', students: 653, percentage: 10.9 },
    { area: 'Ciencias Sociales', students: 531, percentage: 8.9 },
    { area: 'Derecho', students: 491, percentage: 8.2 },
    { area: 'Ingeniería', students: 423, percentage: 7.1 },
    { area: 'Arte y Arquitectura', students: 332, percentage: 5.5 },
    { area: 'Ciencias Básicas', students: 273, percentage: 4.6 },
    { area: 'Agropecuaria', students: 231, percentage: 3.9 }
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

  // Tabs configuration
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

  // Renderizado de etiquetas personalizadas en barras
  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <text x={x + width / 2} y={y - 10} fill="#1e293b" textAnchor="middle" fontSize={20} fontWeight="900">
        {value.toLocaleString('es-CL')}
      </text>
    );
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent default for Space key to avoid page scrolling
      if (e.key === ' ') {
        e.preventDefault();
      }

      if (showIntro) {
        // From intro page, go to first section
        if (e.key === 'ArrowRight' || e.key === ' ') {
          setShowIntro(false);
          setActiveTab(0);
        }
      } else {
        // Navigate between sections
        if (e.key === 'ArrowRight' || e.key === ' ') {
          // Si estamos en Resumen (tab 7)
          if (activeTab === 7) {
            if (resumenPage === 0) {
              // Mostrar página 2 de Resumen
              setResumenPage(1);
            } else {
              // Salir de Resumen y ir a la siguiente sección
              setResumenPage(0);
              setActiveTab(0); // Volver al inicio
            }
          } else {
            setActiveTab((prev) => (prev + 1) % 8);
            setResumenPage(0); // Reset resumen page cuando cambiamos de tab
          }
        } else if (e.key === 'ArrowLeft') {
          // Si estamos en Resumen (tab 7)
          if (activeTab === 7) {
            if (resumenPage === 1) {
              // Volver a página 1 de Resumen
              setResumenPage(0);
            } else {
              // Salir de Resumen y ir a la sección anterior
              setActiveTab(6); // Ir a Costos
              setResumenPage(0);
            }
          } else if (activeTab === 0) {
            // From first section, go back to intro
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
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-3">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                  : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105 border-2 border-gray-200'
              }`}
            >
              <span className="mr-2 text-xl">{tab.icon}</span>
              {tab.name.replace(/^[^\s]+ /, '')}
            </button>
          ))}
        </div>

        {/* Content */}
        {/* Tab 7: Resumen */}
        {activeTab === 7 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            {resumenPage === 0 ? (
              // Página 1: Medidas de Tendencia Central
              <div className="flex-1 flex flex-col gap-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Medidas de Tendencia Central</h2>
                <p className="text-center text-gray-500 text-xl mb-8 font-semibold">Página 1 de 2 - Presiona → para continuar</p>

                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-8">📈 Estadísticas Centrales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon="🎂" label="Edad Promedio" value="24.42 años" sublabel="Mediana: 22 años | Moda: 19 años" color="blue" />
                    <StatCard icon="⏱️" label="Duración Carrera" value="7.86 semestres" sublabel="Mediana: 8 | Moda: 10" color="purple" />
                    <StatCard icon="💳" label="Matrícula Promedio" value="$145,774" sublabel="Mediana: $137,000 | Moda: $137,000" color="green" />
                    <StatCard icon="💰" label="Arancel Promedio" value="$2,693,403" sublabel="Mediana: $2,234,000 | Moda: $3,555,000" color="orange" />
                  </div>

                  <InsightBox title="Interpretación - Tendencia Central" color="blue">
                    <p>• La edad más frecuente es 19 años (recién egresados), pero la media de 24.42 indica presencia significativa de estudiantes mayores</p>
                    <p>• Las carreras de 10 semestres (5 años) son las más comunes, aunque la media de 7.86 sugiere presencia importante de carreras técnicas cortas</p>
                    <p>• El arancel modal ($3.555.000) es superior a la media ($2.693.403), sugiriendo concentración en programas de mayor costo</p>
                  </InsightBox>
                </div>
              </div>
            ) : (
              // Página 2: Medidas de Dispersión
              <div className="flex-1 flex flex-col gap-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Medidas de Dispersión</h2>
                <p className="text-center text-gray-500 text-xl mb-8 font-semibold">Página 2 de 2 - Presiona ← para volver</p>

                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-8">📊 Variabilidad de Datos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon="📏" label="Rango Edad" value="40 años" sublabel="Desviación Estándar: 6.38 | Coeficiente Variación: 26.14%" color="pink" />
                    <StatCard icon="📐" label="Rango Duración" value="13 semestres" sublabel="Desviación Estándar: 3.1 | Coeficiente Variación: 39.48%" color="indigo" />
                    <StatCard icon="📊" label="Rango Matrícula" value="$290,000" sublabel="Desviación Estándar: $50,895 | Coeficiente Variación: 34.91%" color="purple" />
                    <StatCard icon="📈" label="Rango Arancel" value="$5,011,000" sublabel="Desviación Estándar: $1,070,871 | Coeficiente Variación: 39.76%" color="orange" />
                  </div>

                  <InsightBox title="Interpretación - Dispersión" color="orange">
                    <p>• Alta variabilidad en costos (Coeficiente Variación aproximadamente 35-40%), indicando gran diversidad de programas</p>
                    <p>• La duración muestra alta dispersión (Coeficiente Variación 39.48%): desde técnicos cortos hasta medicina y pedagogías</p>
                    <p>• Desviación estándar del arancel superior a $1,000,000 indica gran dispersión en precios</p>
                  </InsightBox>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 0: Distribución por Género */}
        {activeTab === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Distribución por Género</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={170}
                      fill="#8884d8"
                      dataKey="value"
                      style={{ fontSize: '20px', fontWeight: 'bold' }}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <StatCard icon="👩" label="Mujeres" value="3,265" sublabel="56.33% del total" color="pink" />
                <StatCard icon="👨" label="Hombres" value="2,531" sublabel="43.67% del total" color="blue" />
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis de Género" color="purple">
                  <p>• 56.33% mujeres vs 43.67% hombres: mayoría femenina ligera</p>
                  <p>• Refleja tendencia nacional de feminización de educación superior</p>
                  <p>• Consistente con predominio femenino en áreas como Salud y Educación</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Rango de Edad */}
        {activeTab === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Rango de Edad</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageRangeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="range"
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                    height={70}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#4ECDC4" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                    {ageRangeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <StatCard icon="📊" label="Promedio" value="24.42 años" color="blue" />
                <StatCard icon="📍" label="Mediana" value="22 años" color="purple" />
                <StatCard icon="🎯" label="Moda" value="19 años" color="green" />
                <StatCard icon="📏" label="Desviación Estándar" value="6.38 años" color="orange" />
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis Etario" color="blue">
                  <p>• Grupo de 20 a 24 años predomina con 47.3% (2,834 estudiantes)</p>
                  <p>• Moda de 19 años indica fuerte ingreso después de enseñanza secundaria</p>
                  <p>• Desviación estándar de 6.38 años muestra dispersión moderada</p>
                  <p>• 26.14% de coeficiente de variación indica variabilidad etaria considerable</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tipo de Institución */}
        {activeTab === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Tipo de Institución</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={institutionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={280}
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#45B7D1" radius={[0, 12, 12, 0]} label={{ position: 'right', fontSize: 18, fontWeight: 'bold', fill: '#1e293b' }}>
                    {institutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {institutionData.map((inst, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600">{inst.name}</div>
                    <div className="text-2xl font-bold text-gray-800">{inst.students.toLocaleString('es-CL')}</div>
                    <div className="text-xs text-gray-500">{inst.percentage}%</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis Institucional" color="indigo">
                  <p>• Universidad de Magallanes concentra 41% como institución del Consejo de Rectores líder regional</p>
                  <p>• INACAP lidera formación técnico-profesional con 30.6%</p>
                  <p>• Universidades privadas solo 18.8%, baja penetración regional</p>
                  <p>• Centros de Formación Técnica e Institutos Profesionales representan segmento importante de formación técnica</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Modalidad y Jornada */}
        {activeTab === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Modalidad y Jornada</h2>
            <div className="flex-1 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Modalidad */}
              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Modalidad de Estudio</h3>
                <div className="w-full h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modalityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                      >
                        {modalityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Jornada */}
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
                        {scheduleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <StatCard icon="🏫" label="Presencial" value="5,821" sublabel="97.2% del total" color="blue" />
              <StatCard icon="☀️" label="Diurno" value="4,245" sublabel="60.9% del total" color="orange" />
              <StatCard icon="🌙" label="Vespertino" value="1,689" sublabel="24.2% del total" color="purple" />
            </div>

            <div className="mt-8">
              <InsightBox title="Análisis Modalidad y Jornada" color="green">
                <p>• 97.2% presencial: preferencia regional clara por modalidad tradicional</p>
                <p>• Solo 2.8% en línea, muy por debajo de tendencias después de pandemia</p>
                <p>• Jornada diurna predomina (60.9%), pero vespertino y ejecutivo suman 39.1%</p>
                <p>• Segmento importante de estudiantes trabajadores en jornadas alternativas</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 4: Áreas de Conocimiento */}
        {activeTab === 4 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Áreas de Conocimiento</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={knowledgeAreasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="area"
                    angle={-45}
                    textAnchor="end"
                    height={130}
                    tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#F7DC6F" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                    {knowledgeAreasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {knowledgeAreasData.slice(0, 5).map((area, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 shadow">
                    <div className="text-sm text-gray-600 mb-1">#{index + 1}</div>
                    <div className="text-base font-semibold text-gray-800 mb-2">{area.area}</div>
                    <div className="text-2xl font-bold text-indigo-600">{area.students.toLocaleString('es-CL')}</div>
                    <div className="text-sm text-gray-500">{area.percentage}%</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis por Áreas" color="purple">
                  <p>• Salud lidera con 25.1% (1,501 estudiantes), seguido por Tecnología (22.2%)</p>
                  <p>• Top 3 áreas (Salud, Tecnología, Adm. y Comercio) concentran 67.7% de matrícula</p>
                  <p>• Refleja necesidades regionales: salud, tecnología, servicios</p>
                  <p>• Áreas tradicionales como Educación (10.9%) y Derecho (8.2%) mantienen presencia</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Duración de Carreras */}
        {activeTab === 5 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Duración de Carreras</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="duration"
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                    height={70}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 18, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '18px', fontWeight: 'bold' }} />
                  <Bar dataKey="programs" fill="#BB8FCE" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                    {durationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                <StatCard icon="📊" label="Promedio" value="7.86 semestres" sublabel="aproximadamente 4 años" color="blue" />
                <StatCard icon="📍" label="Mediana" value="8 semestres" sublabel="4 años" color="purple" />
                <StatCard icon="🎯" label="Moda" value="10 semestres" sublabel="5 años" color="green" />
                <StatCard icon="📏" label="Rango" value="13 semestres" sublabel="Variabilidad alta" color="orange" />
                <StatCard icon="📐" label="Desviación Estándar" value="3.1 semestres" sublabel="Coeficiente Variación: 39.48%" color="pink" />
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis de Duración" color="indigo">
                  <p>• Moda de 10 semestres (34.4%): predominan carreras profesionales completas (5 años)</p>
                  <p>• Promedio de 7.86 semestres indica mezcla importante de carreras técnicas (2 a 3 años)</p>
                  <p>• Coeficiente de Variación 39.48%: alta diversidad en duración de programas</p>
                  <p>• Rango de 13 semestres: desde técnicos cortos (4 semestres) hasta medicina y pedagogías (14 o más semestres)</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Costos */}
        {activeTab === 6 && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 min-h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Costos</h2>
            <div className="flex-1 flex flex-col">
              <div className="w-full h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="range"
                    angle={-35}
                    textAnchor="end"
                    height={90}
                    tick={{ fill: '#1e293b', fontSize: 13, fontWeight: 'bold' }}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="matricula" fill="#85C1E2" name="Matrícula" radius={[12, 12, 0, 0]} label={{ position: 'top', fontSize: 14, fontWeight: 'bold', fill: '#1e293b' }} />
                  <Bar dataKey="arancel" fill="#F8B739" name="Arancel" radius={[12, 12, 0, 0]} label={{ position: 'top', fontSize: 14, fontWeight: 'bold', fill: '#1e293b' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {/* Matrícula */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-lg h-full">
                  <h4 className="text-2xl font-bold text-gray-800 mb-5">💳 Matrícula</h4>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Media:</span>
                      <span className="font-bold">$145,774</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Mediana:</span>
                      <span className="font-bold">$137,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Moda:</span>
                      <span className="font-bold">$137,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Rango:</span>
                      <span className="font-bold">$290,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Desv. Est.:</span>
                      <span className="font-bold">$50,895</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Coef. Variación:</span>
                      <span className="font-bold text-orange-600">34.91%</span>
                    </div>
                  </div>
                </div>

                {/* Arancel */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 shadow-lg h-full">
                  <h4 className="text-2xl font-bold text-gray-800 mb-5">💰 Arancel</h4>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Media:</span>
                      <span className="font-bold">$2,693,403</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Mediana:</span>
                      <span className="font-bold">$2,234,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Moda:</span>
                      <span className="font-bold">$3,555,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Rango:</span>
                      <span className="font-bold">$5,011,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Desv. Est.:</span>
                      <span className="font-bold">$1,070,871</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Coef. Variación:</span>
                      <span className="font-bold text-orange-600">39.76%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <InsightBox title="Análisis de Costos" color="orange">
                  <p>• Alta variabilidad: Coeficiente de Variación aproximadamente 35-40% indica gran diversidad de programas</p>
                  <p>• Matrícula modal $137.000 coincide con la mediana</p>
                  <p>• Arancel modal $3.555.000 superior al promedio, sugiere concentración en programas de mayor costo</p>
                  <p>• Rango arancel $5.011.000: desde Centros de Formación Técnica económicos hasta medicina e ingeniería de alto costo</p>
                </InsightBox>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default App;
