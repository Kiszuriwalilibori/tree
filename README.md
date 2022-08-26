# Scheme - old recruitment task with some extra development

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

# The objective

-   present my skills

## Features

-   This app renders scheme with several criterias for possible further use
-   One can add and remove criterias from app
-   One can add only criterias not present already

## Technologies

-   HTML
-   SASS/SCSS
-   JS
-   REACT
-   REDUX
-   MATERIAL UI for REACT

## Installation

-   That site is hosted on GH Pages

## Browser Support

-   Not for IE and Opera Mini

## Versions

##### 0.1.0

-   initial

##### 0.2.0

-   better keyboard navigability
-   better background
-   follow duck guideline
-   more logic in reducer and not action

#### 0.3.0

-   array.flat partially replaced flatten function
-   removing items debounced

#### 0.4.0

-   appendItemModal now with formik & yup

#### 0.4.1

-   minor recompositions rather for better file order

#### 0.4.2

#### 0.4.3

dispatches now with useDispatchAction

#### 0.4.4

004 fixed

010 fixed

005 fixed

006 fixed

### 0.5.0

Generally refactored. More tests added

### To do

001 functions try catch

002 przepisać append na na thunka

003 trochę problematyczne input.current.checked bo w niektórych sytuacjach łapie nulla i TS się wali w
komponencie

--004 oba ostrzeżenia -duplicate i missingAlphaChars - nadawałyby się na rendering props bo środek mają ten
sam

--005 ten kawałek powinien być jedną funkcją

let result: itemType | input; if (primary) { result = shouldInitializeCategory ? [inputValue] : inputValue; }
else { result = values.inputValue; }

--006 Dlaczego closeInput jest wywolywany dwa razy po kliknięciu dodaj z dobrym tekstem// patr testy

007 Header mógłby być funkcją przyjmującą dwa propsy i zwracającą komponent a nie obiekt

008 Dopisac komentarze do wszystkich funkcji arytmetycznych

--009 A jednak, id = "Tree_of_choice" się duplikuje, trzeba zanaleźć jakiś inny selektor dla celu testów bo
tylko tam jest użyte. Klasa?

--010 Dodać h1 011 dodać test dla getWarningMessage
