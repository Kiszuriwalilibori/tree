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

### To do

-   functions try catch
-   przepisac append na na thunka
-   trochę problematyczne input.current.checked bo w niektórych sytuacjach łapie nulla i TS się wali w
    komponencie

-   upraszczać i poprawić nazewnictwo

oba ostrzeżenia -duplicate i missingAlphaChars - nadawałyby się na rendering props bo środek mają ten sam

role treeitem dla elementów tekstowych

ten kawałek powinien być jedną funkcją

let result: itemType | input; if (primary) { result = shouldInitializeCategory ? [inputValue] : inputValue; }
else { result = values.inputValue; }

testy

Dlaczego closeInput jest wywolywany dwa razy po kliknięciu dodaj z dobrym tekstem// patr testy

Header mógłby być funkcją przyjmującą dwa propsy i zwracającą komponent a nie obiekt

Dopisac komentarze do wszystkich funkcji arytmetycznych

Zastosować wynik z AXE:All rendered content must be placed inside of container elements with appropriate ARIA
landmark roles. Dodać h1 jakiekolwiek. Może do people???

Przyjrzeć się serviceWorker, jest wywoływany on jako on a nie registration, dziwne, bo działa ale jakby
inaczej
