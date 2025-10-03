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
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold opacity-90 mb-1">{label}</p>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {sublabel && <p className="text-xs opacity-75">{sublabel}</p>}
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
    <div className={`bg-gradient-to-br ${gradients[color]} border-l-4 p-6 rounded-lg shadow-sm`}>
      <h4 className="font-bold text-gray-900 mb-3 flex items-center text-xl">
        <span className="mr-2 text-2xl">💡</span>
        {title}
      </h4>
      <div className="text-gray-800 text-base leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
};

// Tooltip personalizado para gráficos
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-6 py-4 rounded-xl shadow-2xl border-2 border-gray-300">
        <p className="font-bold text-gray-900 text-lg mb-1">
          {payload[0].payload.name || payload[0].payload.range || payload[0].payload.area || payload[0].payload.duration || payload[0].name}
        </p>
        <p className="text-2xl font-black" style={{ color: payload[0].fill }}>
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function App() {
  const [activeTab, setActiveTab] = useState(0);

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
    { name: 'U. de Magallanes (CRUCH)', students: 2456, percentage: 41.0 },
    { name: 'INACAP', students: 1834, percentage: 30.6 },
    { name: 'Universidades Privadas', students: 1123, percentage: 18.8 },
    { name: 'Otros CFT/IP', students: 1574, percentage: 26.3 }
  ];

  const modalityData = [
    { name: 'Presencial', value: 5821, percentage: 97.2 },
    { name: 'Online', value: 166, percentage: 2.8 }
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
    { name: '📊 Resumen', icon: '📊' },
    { name: '👥 Género', icon: '👥' },
    { name: '🎂 Edad', icon: '🎂' },
    { name: '🏛️ Instituciones', icon: '🏛️' },
    { name: '💻 Modalidad', icon: '💻' },
    { name: '📚 Áreas', icon: '📚' },
    { name: '⏱️ Duración', icon: '⏱️' },
    { name: '💰 Costos', icon: '💰' }
  ];

  // Renderizado de etiquetas personalizadas en barras
  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <text x={x + width / 2} y={y - 8} fill="#1e293b" textAnchor="middle" fontSize={18} fontWeight="900">
        {value.toLocaleString('es-CL')}
      </text>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="w-full px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Estadísticas de Educación Superior
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold">Región de Magallanes y Antártica Chilena</p>
          <p className="text-xl text-gray-500 mt-2">Año 2021 • Total: 5,796 estudiantes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl scale-110'
                  : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105 border-2 border-gray-200'
              }`}
            >
              <span className="mr-2 text-2xl">{tab.icon}</span>
              {tab.name.replace(/^[^\s]+ /, '')}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Resumen Ejecutivo - Medidas Estadísticas</h2>

            {/* Medidas de Tendencia Central */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📈 Medidas de Tendencia Central</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard icon="🎂" label="Edad Promedio" value="24.42 años" sublabel="Mediana: 22 | Moda: 19" color="blue" />
                <StatCard icon="⏱️" label="Duración Carrera" value="7.86 sem" sublabel="Mediana: 8 | Moda: 10" color="purple" />
                <StatCard icon="💳" label="Matrícula Promedio" value="$145,774" sublabel="Mediana: $137k | Moda: $137k" color="green" />
                <StatCard icon="💰" label="Arancel Promedio" value="$2,693,403" sublabel="Mediana: $2.2M | Moda: $3.5M" color="orange" />
              </div>

              <InsightBox title="Interpretación - Tendencia Central" color="blue">
                <p>• La edad más frecuente es 19 años (recién egresados), pero la media de 24.42 indica presencia significativa de estudiantes mayores</p>
                <p>• Las carreras de 10 semestres (5 años) son las más comunes, aunque la media de 7.86 sugiere presencia importante de carreras técnicas cortas</p>
                <p>• El arancel modal ($3.555.000) es superior a la media ($2.693.403), sugiriendo concentración en programas de mayor costo</p>
              </InsightBox>
            </div>

            {/* Tabla comparativa */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Variable</th>
                      <th className="px-6 py-4 text-right">Media</th>
                      <th className="px-6 py-4 text-right">Mediana</th>
                      <th className="px-6 py-4 text-right">Moda</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Edad (años)</td>
                      <td className="px-6 py-4 text-right">24.42</td>
                      <td className="px-6 py-4 text-right">22.0</td>
                      <td className="px-6 py-4 text-right">19</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Duración Carrera (Semestres)</td>
                      <td className="px-6 py-4 text-right">7.86</td>
                      <td className="px-6 py-4 text-right">8.0</td>
                      <td className="px-6 py-4 text-right">10</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Valor Matrícula (Pesos)</td>
                      <td className="px-6 py-4 text-right">$145,774</td>
                      <td className="px-6 py-4 text-right">$137,000</td>
                      <td className="px-6 py-4 text-right">$137,000</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Valor Arancel (Pesos)</td>
                      <td className="px-6 py-4 text-right">$2,693,403</td>
                      <td className="px-6 py-4 text-right">$2,234,000</td>
                      <td className="px-6 py-4 text-right">$3,555,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Medidas de Dispersión */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">📊 Medidas de Dispersión</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard icon="📏" label="Rango Edad" value="40 años" sublabel="Desv. Est: 6.38 | CV: 26.14%" color="pink" />
                <StatCard icon="📐" label="Rango Duración" value="13 semestres" sublabel="Desv. Est: 3.1 | CV: 39.48%" color="indigo" />
                <StatCard icon="📊" label="Rango Matrícula" value="$290,000" sublabel="Desv. Est: $50,895 | CV: 34.91%" color="purple" />
                <StatCard icon="📈" label="Rango Arancel" value="$5,011,000" sublabel="Desv. Est: $1,070,871 | CV: 39.76%" color="orange" />
              </div>

              <InsightBox title="Interpretación - Dispersión" color="orange">
                <p>• Alta variabilidad en costos (Coef. Variación ~35-40%), indicando gran diversidad de programas</p>
                <p>• La duración muestra alta dispersión (CV 39.48%): desde técnicos cortos hasta medicina/pedagogías</p>
                <p>• Desviación estándar del arancel superior a $1M indica gran dispersión en precios</p>
              </InsightBox>
            </div>

            {/* Tabla de dispersión */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Variable</th>
                      <th className="px-6 py-4 text-right">Rango</th>
                      <th className="px-6 py-4 text-right">Desv. Estándar</th>
                      <th className="px-6 py-4 text-right">Coef. Variación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Edad (años)</td>
                      <td className="px-6 py-4 text-right">40</td>
                      <td className="px-6 py-4 text-right">6.38</td>
                      <td className="px-6 py-4 text-right">26.14%</td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Duración Carrera (Semestres)</td>
                      <td className="px-6 py-4 text-right">13</td>
                      <td className="px-6 py-4 text-right">3.10</td>
                      <td className="px-6 py-4 text-right">39.48%</td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Valor Matrícula (Pesos)</td>
                      <td className="px-6 py-4 text-right">$290,000</td>
                      <td className="px-6 py-4 text-right">$50,895</td>
                      <td className="px-6 py-4 text-right">34.91%</td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">Valor Arancel (Pesos)</td>
                      <td className="px-6 py-4 text-right">$5,011,000</td>
                      <td className="px-6 py-4 text-right">$1,070,871</td>
                      <td className="px-6 py-4 text-right">39.76%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Distribución por Género */}
        {activeTab === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Distribución por Género</h2>
            <div>
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={160}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <StatCard icon="👩" label="Mujeres" value="3,265" sublabel="56.33% del total" color="pink" />
                <StatCard icon="👨" label="Hombres" value="2,531" sublabel="43.67% del total" color="blue" />
              </div>

              <InsightBox title="Análisis de Género" color="purple" >
                <p>• 56.33% mujeres vs 43.67% hombres: mayoría femenina ligera</p>
                <p>• Refleja tendencia nacional de feminización de educación superior</p>
                <p>• Consistente con predominio femenino en áreas como Salud y Educación</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 2: Rango de Edad */}
        {activeTab === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Rango de Edad</h2>
            <div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={ageRangeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="range"
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                    height={60}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#4ECDC4" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                    {ageRangeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <StatCard icon="📊" label="Media" value="24.42 años" color="blue" />
                <StatCard icon="📍" label="Mediana" value="22 años" color="purple" />
                <StatCard icon="🎯" label="Moda" value="19 años" color="green" />
                <StatCard icon="📏" label="Desv. Est." value="6.38 años" color="orange" />
              </div>

              <InsightBox title="Análisis Etario" color="blue">
                <p>• Grupo 20-24 años predomina con 47.3% (2,834 estudiantes)</p>
                <p>• Moda de 19 años indica fuerte ingreso post-secundaria</p>
                <p>• Desviación estándar de 6.38 años muestra dispersión moderada</p>
                <p>• 26.14% de coeficiente de variación indica variabilidad etaria considerable</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 3: Tipo de Institución */}
        {activeTab === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Tipo de Institución</h2>
            <div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={institutionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={250}
                    tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#45B7D1" radius={[0, 12, 12, 0]}>
                    {institutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {institutionData.map((inst, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600">{inst.name}</div>
                    <div className="text-2xl font-bold text-gray-800">{inst.students.toLocaleString('es-CL')}</div>
                    <div className="text-xs text-gray-500">{inst.percentage}%</div>
                  </div>
                ))}
              </div>

              <InsightBox title="Análisis Institucional" color="indigo">
                <p>• U. Magallanes concentra 41% como institución CRUCH líder regional</p>
                <p>• INACAP lidera formación técnico-profesional con 30.6%</p>
                <p>• Universidades privadas solo 18.8%, baja penetración regional</p>
                <p>• CFT e IP representan segmento importante de formación técnica</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 4: Modalidad y Jornada */}
        {activeTab === 4 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Modalidad de Estudio y Jornada</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Modalidad */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Modalidad de Estudio</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={modalityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {modalityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Jornada */}
              <div className="bg-white rounded-xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Jornada</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scheduleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <StatCard icon="🏫" label="Presencial" value="5,821" sublabel="97.2% del total" color="blue" />
              <StatCard icon="☀️" label="Diurno" value="4,245" sublabel="60.9% del total" color="orange" />
              <StatCard icon="🌙" label="Vespertino" value="1,689" sublabel="24.2% del total" color="purple" />
            </div>

            <InsightBox title="Análisis Modalidad y Jornada" color="green">
              <p>• 97.2% presencial: preferencia regional clara por modalidad tradicional</p>
              <p>• Solo 2.8% online, muy por debajo de tendencias post-pandemia</p>
              <p>• Jornada diurna predomina (60.9%), pero vespertino/ejecutivo suma 39.1%</p>
              <p>• Segmento importante de estudiantes trabajadores en jornadas alternativas</p>
            </InsightBox>
          </div>
        )}

        {/* Tab 5: Áreas de Conocimiento */}
        {activeTab === 5 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Áreas de Conocimiento</h2>
            <div>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart data={knowledgeAreasData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <YAxis
                    dataKey="area"
                    type="category"
                    width={230}
                    tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="students" fill="#F7DC6F" radius={[0, 12, 12, 0]}>
                    {knowledgeAreasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {knowledgeAreasData.slice(0, 5).map((area, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow">
                    <div className="text-xs text-gray-600 mb-1">#{index + 1}</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">{area.area}</div>
                    <div className="text-xl font-bold text-indigo-600">{area.students.toLocaleString('es-CL')}</div>
                    <div className="text-xs text-gray-500">{area.percentage}%</div>
                  </div>
                ))}
              </div>

              <InsightBox title="Análisis por Áreas" color="purple">
                <p>• Salud lidera con 25.1% (1,501 estudiantes), seguido por Tecnología (22.2%)</p>
                <p>• Top 3 áreas (Salud, Tecnología, Adm. y Comercio) concentran 67.7% de matrícula</p>
                <p>• Refleja necesidades regionales: salud, tecnología, servicios</p>
                <p>• Áreas tradicionales como Educación (10.9%) y Derecho (8.2%) mantienen presencia</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 6: Duración de Carreras */}
        {activeTab === 6 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Duración de Carreras</h2>
            <div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="duration"
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                    height={60}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="programs" fill="#BB8FCE" radius={[12, 12, 0, 0]} label={renderCustomLabel}>
                    {durationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                <StatCard icon="📊" label="Media" value="7.86 sem" sublabel="~4 años" color="blue" />
                <StatCard icon="📍" label="Mediana" value="8 sem" sublabel="4 años" color="purple" />
                <StatCard icon="🎯" label="Moda" value="10 sem" sublabel="5 años" color="green" />
                <StatCard icon="📏" label="Rango" value="13 sem" sublabel="Variabilidad alta" color="orange" />
                <StatCard icon="📐" label="Desv. Est." value="3.1 sem" sublabel="CV: 39.48%" color="pink" />
              </div>

              <InsightBox title="Análisis de Duración" color="indigo">
                <p>• Moda de 10 semestres (34.4%): predominan carreras profesionales completas (5 años)</p>
                <p>• Media de 7.86 semestres indica mezcla importante de carreras técnicas (2-3 años)</p>
                <p>• Coef. Variación 39.48%: alta diversidad en duración de programas</p>
                <p>• Rango de 13 semestres: desde técnicos cortos (4 sem) hasta medicina/pedagogías (14+ sem)</p>
              </InsightBox>
            </div>
          </div>
        )}

        {/* Tab 7: Costos */}
        {activeTab === 7 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[600px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Costos</h2>
            <div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={costsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeWidth={2} />
                  <XAxis
                    dataKey="range"
                    angle={-15}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <YAxis
                    tick={{ fill: '#1e293b', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="matricula" fill="#85C1E2" name="Matrícula" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="arancel" fill="#F8B739" name="Arancel" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Matrícula */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">💳 Matrícula</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Media:</span>
                      <span className="font-bold">$145,774</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mediana:</span>
                      <span className="font-bold">$137,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moda:</span>
                      <span className="font-bold">$137,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rango:</span>
                      <span className="font-bold">$290,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desv. Est.:</span>
                      <span className="font-bold">$50,895</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coef. Variación:</span>
                      <span className="font-bold text-orange-600">34.91%</span>
                    </div>
                  </div>
                </div>

                {/* Arancel */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">💰 Arancel</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Media:</span>
                      <span className="font-bold">$2,693,403</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mediana:</span>
                      <span className="font-bold">$2,234,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moda:</span>
                      <span className="font-bold">$3,555,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rango:</span>
                      <span className="font-bold">$5,011,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desv. Est.:</span>
                      <span className="font-bold">$1,070,871</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coef. Variación:</span>
                      <span className="font-bold text-orange-600">39.76%</span>
                    </div>
                  </div>
                </div>
              </div>

              <InsightBox title="Análisis de Costos" color="orange">
                <p>• Alta variabilidad: Coef. Variación ~35-40% indica gran diversidad de programas y precios</p>
                <p>• Matrícula modal $137.000 (valor más frecuente, coincide con mediana)</p>
                <p>• Arancel modal $3.555.000 superior a media de $2.693.403, sugiere concentración en programas de mayor costo</p>
                <p>• Desviación estándar del arancel superior a $1M indica gran dispersión en precios</p>
                <p>• Rango arancel $5.011.000: desde CFT económicos hasta carreras medicina/ingeniería de alto costo</p>
              </InsightBox>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
