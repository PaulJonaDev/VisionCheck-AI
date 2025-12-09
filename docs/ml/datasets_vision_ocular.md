# Datasets Públicos y Legales para Análisis de Visión Ocular

## 1. Resumen de Datasets para Análisis de Ojos y Visión

Esta compilación incluye datasets públicos y legalmente disponibles para entrenar modelos de visión por computadora en análisis ocular, detección de patrones y características del ojo humano. Todos estos datasets son apropiados para investigación y desarrollo de aplicaciones no médicas.

## 2. Datasets de Imágenes de Ojos

### 2.1 Datasets Generales de Ojos

**CASIA-IrisV4**
- **Descripción**: Dataset de iris de alta calidad con múltples condiciones de iluminación
- **Contenido**: 2,567 imágenes de iris de 249 sujetos
- **Características**: Variaciones de iluminación, diferentes ángulos, distancias focales
- **Formato**: JPG, 640x480 píxeles
- **Uso**: Detección de iris, segmentación, reconocimiento biométrico
- **Disponibilidad**: Público con registro
- **URL**: http://www.cbsr.ia.ac.cn/english/IrisDatabase.asp

**UBIRIS.v2**
- **Descripción**: Dataset de iris con condiciones de iluminación no cooperativas
- **Contenido**: 11,102 imágenes de 261 sujetos
- **Características**: Diferentes condiciones de iluminación natural, distancias variables, ruido
- **Formato**: PNG, 400x300 píxeles
- **Uso**: Robustez en reconocimiento de iris, detección en condiciones reales
- **Disponibilidad**: Público
- **URL**: http://iris.di.ubi.pt/ubiris2.html

**MICHE**
- **Descripción**: Dataset de iris capturado con dispositivos móviles
- **Contenido**: 3,732 imágenes de 92 sujetos
- **Características**: Captura con smartphones, diferentes modelos de cámaras
- **Formato**: JPG, varias resoluciones
- **Uso**: Reconocimiento de iris en dispositivos móviles
- **Disponibilidad**: Público con solicitud
- **URL**: https://biplab.unisa.it/MICHE/

### 2.2 Datasets de Detección de Ojos

**GI4E Dataset**
- **Descripción**: Dataset para estimación de punto de mirada con múltiples dispositivos
- **Contenido**: 1,236 imágenes de 103 sujetos con anotaciones de punto de mirada
- **Características**: Diferentes dispositivos, iluminación variable, posiciones de cabeza
- **Formato**: JPG con anotaciones XML
- **Uso**: Estimación de punto de mirada, detección de ojos
- **Disponibilidad**: Público
- **URL**: http://www.ece.northeastern.edu/gi4e/

**EYEDIAP Dataset**
- **Descripción**: Dataset para estimación de punto de mirada en 3D
- **Contenido**: 94 videos de 16 sujetos con datos de profundidad
- **Características**: Múltiples condiciones de iluminación, interacción con pantalla, datos de profundidad
- **Formato**: Videos HD con anotaciones
- **Uso**: Estimación de punto de mirada 3D, seguimiento ocular
- **Disponibilidad**: Público con registro
- **URL**: https://idiap.ch/dataset/eyediap

**RT-GENE Dataset**
- **Descripción**: Dataset para estimación de punto de mirada en entornos naturales
- **Contenido**: 122,531 imágenes de 15 sujetos
- **Características**: Múltiples cámaras, iluminación natural, anotaciones 3D
- **Formato**: PNG con anotaciones JSON
- **Uso**: Estimación de punto de mirada en condiciones reales
- **Disponibilidad**: Público
- **URL**: https://www.cl.cam.ac.uk/research/rainbow/projects/rt_gene/

## 3. Datasets de Enfermedades Oculares (para detección de patrones)

### 3.1 Datasets de Retina y Fondo de Ojo

**DRIVE Dataset**
- **Descripción**: Dataset para detección de vasos sanguíneos retinianos
- **Contenido**: 40 imágenes de fondo de ojo con anotaciones manuales
- **Características**: Alta resolución, anotaciones expertas
- **Formato**: TIFF, 584x565 píxeles
- **Uso**: Segmentación de vasos sanguíneos, detección de patrones
- **Disponibilidad**: Público
- **URL**: https://drive.grand-challenge.org/

**STARE Dataset**
- **Descripción**: Dataset de fondo de ojo para análisis de vasos sanguíneos
- **Contenido**: 400 imágenes con anotaciones de vasos sanguíneos
- **Características**: Diferentes condiciones de iluminación, patologías variadas
- **Formato**: PNG, 605x700 píxeles
- **Uso**: Segmentación de vasos, clasificación de patrones
- **Disponibilidad**: Público
- **URL**: http://cecas.clemson.edu/~ahoover/stare/

**CHASE_DB1**
- **Descripción**: Dataset de fondo de ojo infantil
- **Contenido**: 28 pares de imágenes de ojos de niños
- **Características**: Imágenes binoculares, anotaciones de vasos sanguíneos
- **Formato**: PNG, 999x960 píxeles
- **Uso**: Análisis de vasos sanguíneos en población infantil
- **Disponibilidad**: Público
- **URL**: https://blogs.kingston.ac.uk/retinal/chasedb1/

### 3.2 Datasets de Segmentación y Clasificación

**REFUGE Dataset**
- **Descripción**: Dataset para glaucoma y segmentación de disco óptico
- **Contenido**: 1,200 imágenes con anotaciones de segmentación
- **Características**: Diferentes etapas de glaucoma, anotaciones detalladas
- **Formato**: JPG con máscaras PNG
- **Uso**: Segmentación de disco óptico, detección de glaucoma
- **Disponibilidad**: Público
- **URL**: https://refuge.grand-challenge.org/

**DRISHTI-GS Dataset**
- **Descripción**: Dataset para segmentación de cabeza del nervio óptico
- **Contenido**: 101 imágenes con anotaciones de segmentación
- **Características**: Anotaciones expertas, diferentes condiciones de iluminación
- **Formato**: PNG con máscaras
- **Uso**: Segmentación de estructuras oculares
- **Disponibilidad**: Público
- **URL**: https://cvit.iiit.ac.in/research/projects/cvit-projects/drishti-gs-dataset/

## 4. Datasets de Videos y Movimiento Ocular

### 4.1 Datasets de Seguimiento de Mirada

**GazeCapture Dataset**
- **Descripción**: Dataset de seguimiento ocular en dispositivos móviles
- **Contenido**: 2,445,504 imágenes de 1,474 sujetos
- **Características**: Captura con smartphones/tablets, diferentes aplicaciones
- **Formato**: JPG con anotaciones de punto de mirada
- **Uso**: Estimación de punto de mirada, seguimiento ocular
- **Disponibilidad**: Público
- **URL**: http://gazecapture.csail.mit.edu/

**Eye Tracking Dataset (ETH)**
- **Descripción**: Dataset de seguimiento ocular en entornos de conducción
- **Contenido**: Videos de conducción con datos de seguimiento ocular
- **Características**: Escenarios de conducción real, múltiples condiciones de iluminación
- **Formato**: Videos con datos de seguimiento
- **Uso**: Análisis de atención visual en conducción
- **Disponibilidad**: Público
- **URL**: https://www.ethz.ch/content/specialinterest/baug/ivv/ivv-technologies.html

### 4.2 Datasets de Movimiento Ocular

**EMVIC Dataset**
- **Descripción**: Dataset de clasificación de movimientos oculares
- **Contenido**: 2,250 clips de video con 5 tipos de movimientos oculares
- **Características**: Videos de 1 segundo, anotaciones de tipo de movimiento
- **Formato**: AVI, 320x240 píxeles
- **Uso**: Clasificación de movimientos oculares, análisis de patrones
- **Disponibilidad**: Público
- **URL**: https://www.cs.bham.ac.uk/~sxw662/publications/emvic2016.pdf

**Visually16 Dataset**
- **Descripción**: Dataset de videos con anotaciones de punto de mirada
- **Contenido**: 85 videos con datos de seguimiento ocular
- **Características**: Videos de actividades cotidianas, anotaciones densas
- **Formato**: MP4 con datos de seguimiento
- **Uso**: Análisis de atención visual, predicción de punto de mirada
- **Disponibilidad**: Público
- **URL**: https://www.cvc.uab.es/~afernandez/index.html#datasets

## 5. Datasets de Características Faciales con Énfasis en Ojos

### 5.1 Datasets de Expresión Facial

**CK+ Dataset (Extended Cohn-Kanade)**
- **Descripción**: Dataset de expresiones faciales incluyendo ojos
- **Contenido**: 593 secuencias de video de 123 sujetos
- **Características**: Expresiones emocionales, anotaciones de puntos faciales
- **Formato**: PNG con anotaciones
- **Uso**: Análisis de expresión ocular, detección de ojos
- **Disponibilidad**: Público con registro
- **URL**: http://www.jeffcohn.net/Resources/

**AFEW Dataset**
- **Descripción**: Dataset de expresiones faciales en entornos naturales
- **Contenido**: 1,809 videos de películas con anotaciones
- **Características**: Expresiones en condiciones naturales, ojos bien visibles
- **Formato**: MP4 con anotaciones
- **Uso**: Detección de ojos en condiciones naturales
- **Disponibilidad**: Público con registro
- **URL**: https://cs.anu.edu.au/few/emotiw2015.html

## 6. Consideraciones de Uso y Licencias

### 6.1 Licencias y Restricciones

**Licencias Comunes**:
- **Creative Commons**: La mayoría permiten uso no comercial con atribución
- **Academic Use Only**: Requieren registro académico o institucional
- **Public Domain**: Sin restricciones de uso

**Requisitos de Cita**:
- Siempre cite el dataset original en publicaciones
- Incluya el nombre de los creadores y el año de publicación
- Siga las guías de citación específicas de cada dataset

### 6.2 Consideraciones Éticas

**Privacidad**:
- Todos los datasets deben haber sido recopilados con consentimiento informado
- Verifique que los rostros estén anonimizados cuando sea apropiado
- Considere el impacto en la privacidad de los participantes

**Uso No Médico**:
- Estos datasets son para investigación y desarrollo de patrones
- No deben usarse para diagnóstico médico sin validación clínica apropiada
- Considere las limitaciones de los datos para aplicaciones críticas

## 7. Recomendaciones para Preprocesamiento

### 7.1 Técnicas de Preparación de Datos

**Normalización de Iluminación**:
- Aplicar ecualización de histograma
- Corrección gamma para diferentes condiciones de iluminación
- Normalización de contraste local

**Aumento de Datos**:
- Rotación y escalado de imágenes
- Ajuste de brillo y contraste
- Flip horizontal (cuando sea apropiado)

**Preprocesamiento de Ojos**:
- Detección y recorte de región ocular
- Corrección de alineación
- Normalización de tamaño

### 7.2 Métricas de Evaluación Recomendadas

**Para Detección**:
- Intersection over Union (IoU)
- Precision y Recall
- F1-Score

**Para Segmentación**:
- Dice Coefficient
- Pixel Accuracy
- Mean Intersection over Union (mIoU)

**Para Clasificación**:
- Accuracy
- Confusion Matrix
- ROC-AUC cuando sea aplicable

## 8. Recursos Adicionales

### 8.1 Plataformas de Dataset

**Kaggle**:
- Buscar "eye detection", "gaze estimation", "iris recognition"
- Datasets adicionales de la comunidad
- Notebooks de ejemplo

**Google Dataset Search**:
- Motor de búsqueda especializado en datasets
- Filtros por licencia y disponibilidad

**Papers with Code**:
- Datasets mencionados en publicaciones recientes
- Implementaciones de referencia

### 8.2 Herramientas de Procesamiento

**OpenCV**: Para preprocesamiento de imágenes
**Dlib**: Para detección de puntos faciales
**MediaPipe**: Para detección de ojos en tiempo real
** scikit-image**: Para operaciones de imagen avanzadas

## 9. Conclusión

Esta compilación proporciona una base sólida para investigación en análisis de visión ocular. Los datasets cubren desde imágenes estáticas hasta videos, incluyendo variaciones de iluminación, diferentes dispositivos de captura, y múltiples condiciones de uso. Siempre verifique las licencias actuales y los requisitos de uso antes de comenzar cualquier proyecto.

Para aplicaciones específicas de pattern detection, recomiendo combinar múltiples datasets para mejorar la robustez del modelo, especialmente aquellos que incluyen variaciones de iluminación y diferentes cond
