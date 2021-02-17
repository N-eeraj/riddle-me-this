var score=0;
var qNo=1;

const questions = [
					'Who is the richest man?', 'Who is the founder of Facebook?', 'Which country did Diego Maradona play for?',
					'Who has most double centuries in ODI cricket?', 'Who invented Python (Programming Language)?',
					'Who played as Tony Stark (Iron Man) in the MCU movies?', 'Which is the oldest language?',
					'What is the SI unit of power of lens?', 'Who is considered as the father of Computer?', 'Who is the first computer programmer?'
				]
const option1s = ['Jeff Bezos' ,'Mark Zuckerberg', 'Brazil', 'Virat Kohli', 'Steve Jobs',
				'Robert Downey Jr.', 'English', 'Watt', 'Charles Babbage', 'Mark Zuckerberg']
const option2s = ['Elon Musk', 'Kevin Systrom', 'Argentina', 'Sachin Tendulkar', 'Brendan Eich',
				'Chris Evans', 'Sanskrit', 'Joule', 'Aristotle', 'Alan Turing']
const option3s = ['Mukesh Ambani', 'Brian Acton', 'Portugal', 'Rohit Sharma', 'Guido van Rossum',
				'Chris Hemsworth', 'Tamil', 'Ohm', 'Archimedes', 'Bill Gates']
const option4s = ['Jack Ma', 'Jesse Eisenberg', 'England', 'Brian Lara', 'Bjarne Stroustrup',
				'Mark Ruffalo', 'German', 'Dioptre', 'Sundar Pichai', 'Ada Lovelace']
const answers = ['Elon Musk', 'Mark Zuckerberg', 'Argentina', 'Rohit Sharma', 'Guido van Rossum',
				'Robert Downey Jr.', 'Tamil', 'Dioptre', 'Charles Babbage', 'Ada Lovelace']

var key='';
let plrName='No Name';

for(var i in questions)
{
	var QNo = parseInt(i) + 1
	key += QNo+'. '+questions[i]+'<br>&nbsp;&nbsp;&nbsp;&nbsp;'+answers[i]+'<br><br>';
}

function startQuiz()
{
	plrName = document.getElementsByTagName('input')[0].value;
	document.body.innerHTML = `
	<h1 class=txt_cntr>Quiz</h1>
		<h3 id=question></h3>
		<div id=main class=txt_cntr>
			<div>
				<h4 class=middle id=op1 onClick=checkAnswer(option1s)></h4>
				<h4 class=middle id=op2 onClick=checkAnswer(option2s)></h4>
			</div>
			<div>
				<h4 class=middle id=op3 onClick=checkAnswer(option3s)></h4>
				<h4 class=middle id=op4 onClick=checkAnswer(option4s)></h4>
			</div>
			<hr>
		</div>`;
	loadQuestion()
}
function loadQuestion()
{
	document.getElementById('question').innerHTML = qNo+'. '+questions[qNo-1];
	document.getElementById('op1').innerHTML = option1s[qNo-1];
	document.getElementById('op2').innerHTML = option2s[qNo-1];
	document.getElementById('op3').innerHTML = option3s[qNo-1];
	document.getElementById('op4').innerHTML = option4s[qNo-1];
	document.getElementsByTagName('hr')[0].style.width = qNo*10+'%';
}

function fnRetry()
{
	document.getElementsByTagName('h1')[0].innerHTML='Quiz';
	document.getElementById('main').innerHTML=`
			<div>
				<h4 class=middle id=op1 onClick=checkAnswer(option1s)></h4>
				<h4 class=middle id=op2 onClick=checkAnswer(option2s)></h4>
			</div>
			<div>
				<h4 class=middle id=op3 onClick=checkAnswer(option3s)></h4>
				<h4 class=middle id=op4 onClick=checkAnswer(option4s)></h4>
			</div>
			<hr>`;
	qNo=1;
	score=0;
	loadQuestion()
}

function fnAnswers()
{
	document.getElementsByTagName('h1')[0].innerHTML='Answers';
	document.getElementsByTagName('div')[0].innerHTML=key;
	document.getElementsByTagName('div')[0].style.fontSize='14pt';
	document.getElementsByTagName('div')[0].setAttribute('class', '');
}

function checkAnswer(options)
{
	selected = options[qNo-1];
	if(selected==answers[qNo-1]){score++;}
	qNo++;
	
	if(qNo<(questions.length+1)){loadQuestion()}
	else
	{		
		document.getElementsByTagName('h1')[0].innerHTML='Score';
		document.getElementsByTagName('h3')[0].innerHTML='';
		document.getElementsByTagName('div')[1].innerHTML=score;
		document.getElementsByTagName('div')[1].setAttribute('class','card txt_cntr centered');
		document.getElementsByTagName('div')[2].innerHTML='<button>Retry</button><button>Answers</button>';
		document.getElementsByTagName('div')[2].style.marginTop= '5%';
		document.getElementsByTagName('div')[2].style.width= '100%';
		document.getElementsByTagName('div')[2].style.flexDirection= 'row';
		document.getElementsByTagName('div')[2].style.justifyContent= 'space-evenly';
		document.getElementsByTagName('button')[0].setAttribute('class','btn btn_light');
		document.getElementsByTagName('button')[1].setAttribute('class','btn btn_dark');
		document.getElementsByTagName('button')[0].setAttribute('onClick', 'fnRetry()');
		document.getElementsByTagName('button')[1].setAttribute('onClick', 'fnAnswers()');
		document.getElementsByTagName('hr')[0].style.display = 'none';
	}
}