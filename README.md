# Visual-A
datasets VA
## README

Tarea3: Insights
Autores: 
	## Carlos Moreno Ibargúen  

La visualización se encuentra disponible en Observable en el siguiente enlace:

Requisitos
-https://d3js.org/d3.v5.min.js


# Contexto
Esta investigación registra el ingreso legal de mercancías originarias de otro país o de una zona franca colombiana hacia el territorio aduanero nacional.

Estas cifras se producen con base en las declaraciones de importación presentadas ante las diferentes administraciones de aduanas del país y se registran estadísticamente, según la fecha de presentación ante las entidades financieras autorizadas para recaudar los tributos aduaneros.

Las estadísticas de importaciones colombianas son producidas por la Dirección de Impuestos y Aduanas Nacionales (DIAN). El DANE, en busca de asegurar y garantizar la veracidad e imparcialidad de la información, está publicando las estadísticas de importaciones colombianas agregadas en cuatro grandes grupos definidos por la Organización Mundial de Comercio (OMC), basada en la Clasificación Uniforme del Comercio Internacional: agropecuario, alimentos y bebidas (incluye productos alimenticios, animales vivos, tabaco, grasas y aceites, entre otros productos), combustibles y productos de las industrias extractivas (incluye el petróleo crudo y sus derivados y carbón, entre otros), manufacturas (contiene productos químicos, maquinaria y equipo de transporte) y otros sectores (incluye oro no monetario y productos no clasificados en las anteriores agrupaciones).

Los datos estan disponibles en:

https:https://www.nube-mcit.gov.co/public.php?service=files&t=3040a9a7106f89ad382a71dd9993e4ba&path=%2FImportaciones%2FFOBDO%2FSECTOR%2FHIST%C3%93RICO&files=impo_fob_SECTORES%20GENERAL.xlsx&download
PreProcesados:  
- https://github.com/Cuntaquinte/va-tarea3/blob/master/data/importaciones.json
- https://github.com/Cuntaquinte/va-tarea3/blob/master/data/imports_proccessed1.csv


# Objetivos del proyecto  y tecnologías usadas:
El objetivo del proyecto es generar una herramienta que permita ver patrones en el comportamiento de las importaiones en Colombia para el periodo 1991 - 2017.
La técnologia utilizada fue html, css,javascript + libreria D3 V5. Los datos se manipularon en los formatos csv y json.

# Analisis de los datos
## Preprocesamiento de datos. 
Se generaron dos sets de datos eon el fin de agilizar el acceso a los detalles.
Se reordenaron los atribustos de manera que permitieran seleccionarlos facilmente por año.

## What?
### Tipos de atributos
PRODUCTO:	Categorico
CATEGORIA:	Categorico
DATE:	Ordenado - Ordinal - Secuencial
IMPORTE:	Ordenado - Cuantitativo
## Why?
Analyze - Consume- Discover >> Distribution
Search - Browse >> Features
Sumarize >> Features
## How?
### Marcas y Canales
Marca	  Canales
Line	  Color-Hue
-- --	  Pos X
-- --   Pos Y

## Explore  el gráfico!!!.
Al PASAR el mousse sobre las barras de los diferentes año puede observar información la cantidad importada.
Al hacer CLICK sobre una bara observará datos adicionales sobre los productos que fueron reportados.


