# 📊 Dashboard Educación Superior - Región de Magallanes 2021

Dashboard interactivo de estadísticas de educación superior en la Región de Magallanes y Antártica Chilena, basado en el **Registro de Matrícula de Educación Superior año 2021**.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Recharts](https://img.shields.io/badge/Recharts-2.10.0-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CDN-06B6D4)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF)

## 📋 Descripción

Este proyecto es un dashboard completo y profesional que visualiza estadísticas educativas de nivel superior en la Región de Magallanes para el año 2021. Incluye análisis detallados con **medidas de tendencia central** (media, mediana, moda) y **medidas de dispersión** (rango, varianza, desviación estándar, coeficiente de variación).

### 📊 Datos Clave

- **Total de estudiantes**: 5,796
- **Período**: Año 2021
- **Región**: Magallanes y Antártica Chilena
- **Fuente**: Registro de Matrícula de Educación Superior

## ✨ Características

### 8 Visualizaciones Interactivas

1. **📊 Resumen Ejecutivo**: Medidas de tendencia central y dispersión
2. **👥 Distribución por Género**: Análisis de matrícula por género
3. **🎂 Rangos de Edad**: Distribución etaria de estudiantes
4. **🏛️ Instituciones**: Distribución por tipo de institución educativa
5. **💻 Modalidad y Jornada**: Análisis de modalidad (presencial/online) y jornada
6. **📚 Áreas de Conocimiento**: Top 10 áreas de estudio
7. **⏱️ Duración de Carreras**: Análisis de duración en semestres
8. **💰 Costos**: Análisis comparativo de matrículas y aranceles

### 📈 Medidas Estadísticas Incluidas

#### Medidas de Tendencia Central
- **Edad**: Media 24.42 años | Mediana 22 | Moda 19
- **Duración Carrera**: Media 7.86 sem | Mediana 8 | Moda 10
- **Matrícula**: Media $145,774 | Mediana $137,000 | Moda $137,000
- **Arancel**: Media $2,693,403 | Mediana $2,234,000 | Moda $3,555,000

#### Medidas de Dispersión
- **Edad**: Rango 40 | Desv. Est. 6.38 | CV 26.14%
- **Duración**: Rango 13 | Desv. Est. 3.1 | CV 39.48%
- **Matrícula**: Rango $290,000 | Desv. Est. $50,895 | CV 34.91%
- **Arancel**: Rango $5,011,000 | Desv. Est. $1,070,871 | CV 39.76%

## 🚀 Instalación y Ejecución

### Prerequisitos

- Node.js 16+ y npm

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/TinderSoccer/Prueba_Estadistica.git
cd Prueba_Estadistica

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# El dashboard estará disponible en http://localhost:5173
```

### Build para producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

## 🛠️ Stack Tecnológico

- **React 18.2.0**: Framework principal
- **Vite 5.0.0**: Build tool y dev server
- **Recharts 2.10.0**: Librería de gráficos
- **Tailwind CSS**: Framework CSS (vía CDN)

## 📁 Estructura del Proyecto

```
magallanes-education-dashboard/
├── public/
│   └── index.html          # HTML principal con Tailwind CDN
├── src/
│   ├── App.jsx             # Componente principal con todas las visualizaciones
│   └── index.js            # Punto de entrada de React
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Este archivo
```

## 🎨 Componentes Principales

### `StatCard`
Tarjetas visuales para mostrar estadísticas clave con gradientes de color.

### `InsightBox`
Cajas de análisis interpretativo con insights estadísticos.

### `CustomTooltip`
Tooltips personalizados para gráficos de Recharts.

## 📊 Gráficos Implementados

- **BarChart**: Gráficos de barras verticales y horizontales
- **PieChart**: Gráficos circulares para porcentajes
- Todos con tooltips interactivos y labels personalizados
- Diseño responsive adaptado a móvil, tablet y desktop

## 🌐 Deploy

Este proyecto puede ser deployado fácilmente en:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Subir carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
npm run build
# Configurar GitHub Pages para servir desde /dist
```

## 🔄 Actualización de Datos

Para actualizar los datos estadísticos:

1. Editar el archivo `src/App.jsx`
2. Buscar las variables de datos (líneas 76-155 aprox.)
3. Modificar los valores según nuevos datos
4. Actualizar medidas estadísticas en el Resumen Ejecutivo
5. Guardar y recargar

## 📄 Licencia

MIT License - Libre uso para fines educativos y comerciales.

## 👨‍💻 Autor

Dashboard creado para análisis estadístico de educación superior en Magallanes.

## 🙏 Créditos

- **Datos**: Registro de Matrícula de Educación Superior 2021
- **Visualizaciones**: Recharts
- **Diseño**: Tailwind CSS
- **Framework**: React + Vite

## 📧 Contacto

Para consultas o sugerencias sobre este dashboard, por favor crear un issue en el repositorio.

---

**Última actualización**: 2025
**Versión**: 1.0.0