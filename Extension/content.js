chrome.runtime.sendMessage({'getdata': 'roomcode'}, h_d);

makeWarning();

var alldiv, closerto_answer, vals;

function h_d(data){
    alldiv = document.getElementsByClassName('quiz-container-inner');

    if(alldiv[0] != undefined){
        console.log('QUIZIZZ!!!!!');
        vals = data;
        process();
    }else{
        console.log('NIE QUIZIZZ!!!!!');
        setTimeout(h_d, 2000, data);
    }
}

function process(){
    console.log(vals);

    var opt = getAnswers();
    var que = getQuestion();

    console.log(que);
    console.log(opt);
    console.log(vals);

    for(let a = 0;a<vals['data']['answers'].length;a++){
        var quest = vals['data']['answers'][a]['question'];

        quest = quest.replaceAll('<p>', '');
        quest = quest.replaceAll('</p>', '');
        quest = quest.replaceAll(' ', '');
        console.log(vals['data']['answers'].length);

        if(que == quest){
            console.log('----------------FOUND QUESTION----------------');
            var answers = vals['data']['answers'][a]['answer'];

            //input type question
            if(opt == false){
                console.log('INPUT QUESTION!!!!!!');
                var inputel = document.getElementsByClassName('typed-option-input')[0];

                inputel.placeholder = answers[0];

                checkAgain(que.toString());

                return 0;
            }
            //multiple answers
            else if(answers[1] != undefined){
                var opt_num = opt['allopt'].length;

                for(let h=0;h<answers.length;h++){
                    var answer = answers[h];

                    answer = answer.replaceAll('<p>', '');
                    answer = answer.replaceAll('</p>', '');
                    answer = answer.replaceAll(' ', '');

                    for(let g = 0;g<opt_num;g++){
                        console.log('answers', opt['allopt'][g]);
                        if(opt['allopt'][g] == answer){
                            console.log('----------------FOUND MULTIPLE ANSWER----------------');

                            var answerblock = closerto_answer.children[g].querySelector('.bpl-container');
                            answerblock.style.background = 'green';
                        }
                    }
                }
                checkAgain(que.toString());

                return 0;

            }else{
                console.log('NORMALNE');
                var opt_num = opt['allopt'].length;

                var answer = answers[0];

                answer = answer.replaceAll('<p>', '');
                answer = answer.replaceAll('</p>', '');
                answer = answer.replaceAll(' ', '');

                for(let n=0;n<opt_num;n++){
                    if(opt['allopt'][n] == answer){
                        console.log('----------------FOUND SINGLE ANSWER----------------');

                        var answerblock = closerto_answer.children[n].querySelector('.bpl-container');
                        answerblock.style.background = 'green';

                        checkAgain(que.toString());

                        return 0;
                    }
                }
            }
        }
    }
    checkAgain(que.toString());

    return 0;
}

function getAnswers(){
    closerto_answer = document.getElementsByClassName('options-grid')[0];
    var options = {'allopt': []};

    if(closerto_answer == undefined){
        return false;
    }
    else{
        for(let i = 0;i<closerto_answer.children.length;i++){
            var text = closerto_answer.children[i].querySelector('.resizeable').childNodes[0].textContent;

            text = text.replaceAll('<p>', '');
            text = text.replaceAll('</p>', '');
            text = text.replaceAll(' ', '');

            options['allopt'].push(text);
        }

        return options;
    }
}

function getQuestion(){
    var question = document.getElementById('questionText').children[0].firstChild.textContent;

    question = question.replaceAll('<p>', '');
    question = question.replaceAll('</p>', '');
    question = question.replaceAll(' ', '');
    
    return question;
}

function checkAgain(old_q){
    var q_elem = document.getElementById('questionText').children[0].firstChild;

    if(q_elem != undefined){
        var question = q_elem.textContent;
 
        question = question.replaceAll('<p>', '');
        question = question.replaceAll('</p>', '');
        question = question.replaceAll(' ', '');
    
        if(question != old_q && document.getElementById('questionText').children[0].firstChild != undefined){
            //console.log('NOWE');
            process();
        }else{
            console.log('STARE');
            setTimeout(checkAgain, 3000, old_q)
        }
    }
}

function makeWarning(){
    var me = document.createElement('h1');
    document.body.appendChild(me);

    me.textContent = 'SHOWING ANSWERS';
    me.style.position = 'absolute';
    me.style.color = 'red';
    me.style.textAlign = 'center';
    me.style.top = '2%';
    me.style.left = '40%';
    me.style.width = '20%';
    me.style.zIndex = 999999;
}