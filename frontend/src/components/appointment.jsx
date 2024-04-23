import axios from "axios";
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from "react-toastify";



import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import '../index.css';

// Lista de preguntas y respuestas
const questions = [
  {
    question: 'HE LEÍDO Y ESTOY DE ACUERDO CON LO ESTABLECIDO EN EL AVISO DE PRIVACIDAD Y AUTORIZACIÓN DE USO DE DATOS PERSONALES DENTRO DE LA PÁGINA DE preventix.global/es/aviso-privacidad/',
    answers: ['Sí acepto', 'No acepto'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'HE LEÍDO Y ESTOY DE ACUERDO CON LO ESTABLECIDO EN EL CONSENTIMIENTO INFORMADO SOBRE EL USO DE MI MUESTRA BIOLÓGICA Y RESPUESTAS. TODAS LAS RESPUESTAS SON ANONIMAS Y SON UTILIZADAS CON FINES DE INVESTIGACIÓN. CONTENIDAS EN https://preventix.global/consentimiento/',
    answers: ['Sí acepto', 'No acepto'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Cumple mínimo con 6 horas de ayuno',
    answers: ['No', 'Sí'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿A qué hora fue tu último alimento?',
    answers: [],
    field: 'date',
    type: 'clock',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué tipo de alimento consumiste?',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Nombre(s) de la paciente',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Apellido paterno (primer apellido)',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Apellido materno (segundo apellido)',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Día de nacimiento',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Mes de nacimiento',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Fecha nacimiento',
    answers: [],
    field: 'int32',
    type: 'date',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  
  {
    question: 'Año de nacimiento',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cómo describirías la zona que habitas?',
    answers: ['Urbana', 'Rural', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuál es tu último grado de estudios?',
    answers: ['Educación básica (Primaria / Secund1aria )', 'Educación media ( Bachillerato o Preparatoria )', 'Educación media superior ( Técnico )', 'Educación superior ( Licenciatura o Ingeneria )', 'Postgrado ( Maestría, Doctorado o Especialización  )', 'No tengo estudios', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Lugar de la toma de muestra',
    answers: [],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Ingresa tu correo electrónico',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Confirma tu correo electrónico',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Ingresa tu teléfono móvil (celular)',
    answers: [],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuál es tu peso en kilogramos (kg)?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuál es tu estatura en metros (m)?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Fuiste vacunada contra el virus del papiloma humano (VPH)?',
    answers: ['Sí, recibí 1 dosis', 'Sí, recibí 2 dosis', 'Sí, recibí 3 dosis', 'Sí, no recuerdo cuantas dosis recibí', 'No', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Te han detectado alguna de estas condiciones en estudios de laboratorio?',
    answers: ['Cáncer', 'Diabetes', 'Hipertensión', 'Enfermedad Tiroidea', 'Enfermedad del sistema inmune', 'Infecciones de transmisión sexual no-virales (Clamidia, gonorrea, sífilis, tricomoniasis o micoplasmosis)', 'Infecciones de transmisión sexual virales (herpes simple, hepatitis B, molusco contagioso o VIH)', 'Virus del papiloma humano (VPH)', 'Nunca me han aplicado ninguna de estas pruebas de detección', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Has fumado tabaco?',
    answers: ['Sí, fumé un tiempo pero ya lo dejé', 'Sí, actualmente sigo fumando', 'No, nunca he fumado'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'En promedio, ¿cuántos cigarrillos de tabaco consumías semanalmente?',
    answers: ['De 1-35 cigarrillos por semana (5 diarios)', 'De 36-105 cigarrillos por semana (6-15 diarios)', '106 cigarrillos o más por semana (16 o más diarios)'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'En promedio, ¿cuántos cigarrillos de tabaco consumes semanalmente?',
    answers: ['De 1-35 cigarrillos por semana (5 diarios)', 'De 36-105 cigarrillos por semana (6-15 diarios)', '106 cigarrillos o más por semana (16 o más diarios)'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Te has realizado una prueba de Papanicolaou?',
    answers: ['Sí, sólo 1 vez', 'Sí, 2 veces o más', 'No, nunca', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿En qué año te realizaste la prueba de Papanicolaou?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿En qué año realizaste tu última prueba de Papanicolaou?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué resultado obtuviste en tu prueba de Papanicolaou?',
    answers: ['Negativo a lesión y/o cáncer (sana)', 'Negativo a lesión/cáncer con proceso inflamatorio (sana con inflamación)', 'Negativo a lesión/cáncer con infección', 'Displasia leve NIC-1 (lesión leve)', 'Displasia moderada NIC-2 (lesión moderada)', 'Displasia severa NIC-3 (lesión severa)', 'Cáncer cervicouterino', 'No recuerdo', 'No recibí mi resultado'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué resultado obtuviste en tu última prueba de Papanicolaou?',
    answers: ['Negativo a lesión y/o cáncer (sana)', 'Negativo a lesión/cáncer con proceso inflamatorio (sana con inflamación)', 'Negativo a lesión/cáncer con infección', 'Displasia leve NIC-1 (lesión leve)', 'Displasia moderada NIC-2 (lesión moderada)', 'Displasia severa NIC-3 (lesión severa)', 'Cáncer cervicouterino', 'No recuerdo', 'No recibí mi resultado'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Con qué periodicidad te realizas la prueba de Papanicolaou?',
    answers: ['Cada 6 meses', 'Cada año', 'Cada 2 años', 'Cada 3 años', 'Cada 5 años'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Por qué nunca te has realizado una prueba de Papanicolaou?',
    answers: ['Aún no inicio mi vida sexual', 'Me da temor/vergüenza recibirla', 'No tengo acceso a una clínica ginecológica', 'No tengo tiempo', 'No puedo pagarla', 'Mi familia/pareja no me lo permiten', 'Considero que no necesito recibirla', 'No deseo recibirla'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Te has realizado una colposcopia?',
    answers: ['Sí, 1 vez', 'Sí, 2 o más veces', 'No, nunca', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿En qué año realizaste tu última colposcopia?',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿En qué año te realizaste la colposcopia?',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué resultado obtuviste en la colposcopia?',
    answers: ['Sin alteraciones', 'Alteraciones inflamatorias inespecíficas', 'Virus del papiloma humano (VPH)', 'Displasia leve (NIC-1)', 'Displasia moderada (NIC-2)', 'Displasia grave (NIC-3)', 'Cáncer', 'Otros (pólipos, quistes, miomas, adenosis)', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué resultado obtuviste en tu última colposcopia?',
    answers: ['Sin alteraciones', 'Alteraciones inflamatorias inespecíficas', 'Virus del papiloma humano (VPH)', 'Displasia leve (NIC-1)', 'Displasia moderada (NIC-2)', 'Displasia grave (NIC-3)', 'Cáncer', 'Otros (pólipos, quistes, miomas, adenosis)', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Te han realizado una histerectomía?',
    answers: ['Sí', 'No'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Recuerdas la razón por la que te realizaron la histerectomía?',
    answers: ['Por razones clínicas distintas al cáncer', 'Porque tenía cáncer de ovario', 'Porque tenía cáncer de endometrio', 'Porque tenía cáncer cervicouterino', 'Por otras razones', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'Fecha de la última menstruación',
    answers: ['Recientemente', 'Ya no la tengo (menopausia)', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿A qué edad en años, tuviste tu primera menstruación?',
    answers: [],
    field: 'String',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Has tenido relaciones sexuales?',
    answers: ['Sí', 'No', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿A qué edad tuviste relaciones sexuales por primera vez?',
    answers: ['Si no recuerdas este dato coloca un número 0. El valor debe ser un número.'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuántas parejas sexuales has tenido?',
    answers: ['1', '2', '3', '4 o más', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Qué método anticonceptivo usas actualmente o el último que usaste?',
    answers: ['Condón', 'Anticonceptivos orales', 'Anticonceptivos inyectables', 'Parche anticonceptivo', 'DIU hormonal', 'DIU de cobre', 'Píldora del día siguiente', 'Ligación de trompas de Falopio', 'Ninguno (nunca he usado métodos anticonceptivos)', 'Coito interrumpido', 'No recuerdo', 'Prefiero no contestar'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: 'En caso de haber seleccionado anticonceptivos orales, ¿por cuánto tiempo los has usado?',
    answers: ['Menos de 1 año', '1 año o más, pero menos de 2 años', '2 años o más, pero menos de 3 años', '3 años o más, pero menos de 4 años', '4 años o más, pero menos de 5 años', '5 años o más', 'No recuerdo'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Te has embarazado?',
    answers: ['Sí', 'No'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuántos partos has tenido?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuántas cesáreas has tenido?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Has tenido abortos?',
    answers: ['Sí', 'No'],
    field: 'String',
    type: 'choice',
    nextq: 'next',
    answerclose: '2',
    messageclose: ''
  },
  {
    question: '¿Cuántos abortos has tenido?',
    answers: [],
    field: 'int32',
    type: 'textbox',
    nextq: 'close',
    answerclose: '2',
    messageclose: ''
  }
];

// Estado inicial de la aplicación
const initialState = {
    questions: questions,
    status: 'ready',
    index: 0,
    answer: null,
    highscore: 0,
    secondsRemaining: null,
};

// Reductor para manejar las acciones de la aplicación
function reducer(state, action) {
  switch (action.type) {
      case 'start':
          return {
              ...state,
              status: 'active',
              secondsRemaining: null,
          };
      case 'newAnswer':
          return {
              ...state,
              answer: action.payload,
          };
      case 'nextQuestion':
          return {
              ...state,
              index: state.index + 1,
              answer: null,
          };
      case 'finish':
          return {
              ...state,
              status: 'finished',
              highscore: state.highscore,
          };
      case 'restart':
          return {
              ...initialState,
              status: 'ready',
          };
      case 'ANSWER_QUESTION':
          return {
              ...state,
              answers: {
                  ...state.answers,
                  [state.currentQuestionIndex]: action.payload.index,
              },
              currentQuestionIndex: state.currentQuestionIndex + 1,
          };
      // Manejo de acciones desconocidas
      default:
          console.warn('Unknown action:', action.type);
          return state;
  }
}

// Define la función handleClick
const handleClick = (index) => {
  // Asegúrate de despachar la acción con el tipo correcto
  dispatch({ type: 'ANSWER_QUESTION', payload: { index } });
};

// Función para manejar el envío de datos
const handleSubmitData = async (answers) => {
    try {
        const response = await axios.post(
            'http://localhost:4000/api/v1/appointment/post',
            answers,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        toast.success(response.data.message);
    } catch (error) {
        toast.error('Error al enviar los datos');
    }
};


export default function App() {
    const [{ questions, status, index, answer, highscore }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestions = questions.length;

    return (
        <div className="wrapper">
          
            <div className="app">
                <div className="headerWrapper">
                
                        {status === 'loading' && <Loader />}
                        {status === 'error' && <Error />}
                        {status === 'ready' && (
                            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
                        )}
                        {status === 'active' && (
                            <>
                                <Progress index={index} numQuestions={numQuestions} answer={answer} />
                                <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                                <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
                            </>
                        )}
                        {status === 'finished' && (
                            <FinishScreen highscore={highscore} dispatch={dispatch} handleSubmitData={handleSubmitData} />
                        )}
                    
                    
                </div>
            </div>
        </div>
    );
}
