let getSinglePlayer = (roundNumber,playerNumber,player)=>{
    // i will use later if this grows
    let uid = player+"-"+(roundNumber+1)+"-"+(playerNumber+1);
    let playerId = player+"-"+(playerNumber+1);
    score[playerId] = 0;
    return `
        <div class="col singlePlayer border-1 m-2 p-2 border rounded ${playerId}" playerId="${playerId}">
            <div class="row">
                <div class="col pb-3">
                    <input type="text" class="form-control nameOfPlayer ${uid} ${playerId}" id="${uid}" value="${player}" placeholder="Enter Player ${(playerNumber+1)} Name " readonly disabled>
                </div>
            </div>
            <ul class="list-group ${uid} ${playerId}">
                <li class="list-group-item">
                    <input type="number" class="form-control text-end throwInput ${uid} ${playerId}" placeholder="Throw 1" playerId="${playerId}" roundNumber="${roundNumber+1}">
                </li>
                <li class="list-group-item">
                    <input type="number" class="form-control text-end throwInput ${uid} ${playerId}" placeholder="Throw 2" playerId="${playerId}" roundNumber="${roundNumber+1}">
                </li>
                <li class="list-group-item">
                    <input type="number" class="form-control text-end throwInput ${uid} ${playerId}" placeholder="Throw 3" playerId="${playerId}" roundNumber="${roundNumber+1}">
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class=" col text-start">Round - ${roundNumber + 1} Score</div>
                        <div class=" col text-end total ${uid} ${playerId} text-large">0</div>
                    </div>
                </li>
            </ul>
        </div>
    
    `;
}

let getSinglePlayerName = ()=>{
    return `<input type="text" class="playerName mb-2 form-control text-center" placeholder="Player Name">`;
}

let getSingleRound = (roundNumber,players)=>{
    let html = `
        <div class="row singleRound border-3 m-2 p-2 border rounded round-${roundNumber+1}">
            <h3>Round - ${roundNumber+1}</h3>`;
            players.forEach((player,playerNumber) => {
                html += getSinglePlayer(roundNumber,playerNumber,$(player).val());
            });
    html += `</div>`;
    return html;
}

let score = {};
let currentRound = 0;
let showWhosTheBoss = ()=>{
    let maxPlayerId = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    if(score[maxPlayerId] == 0){ return; }
    if(currentRound != 1 || maxPlayerId.split('-')[1] != 1){
        $('.border-success').removeClass('border-success');
        $('.singlePlayer.'+maxPlayerId).addClass('border-success');
        $('.bg-success.text-white').removeClass('bg-success text-white');
        $('.nameOfPlayer.'+maxPlayerId).addClass('bg-success text-white');
    }
}

jQuery(document).ready(function($){
    $('.startTheGame').click((e)=>{
        if($('.numberOfRounds').val() < 2){
            alert('ch*t*ya he kya?');
            return true;
        }

        let players = $('.playerNameHolder .playerName').toArray();
        if(players.length < 2){
            alert('ch*t*ya he kya?');
            return true;
        }
        $('.controlDiv').slideUp();
        
        for(i=0;i < $('.numberOfRounds').val(); i++){
            $('.playerHolderDiv').append(getSingleRound(i,players));
        }
        $('.playerHolderDiv').slideDown();
    });

    $(document).on('keyup','.throwInput',(e)=>{
        crrElement = $(e.currentTarget);
        // $(this).parentsUntil('.singlePlayer').find('.total').html( $(this).parentsUntil('.singlePlayer').find('.throwInput').reduce() )
        // console.log($(this).parent().parent().find('.throwInput').toArray().reduce((id,crrE,total)=>{ return total + parseInt($(crrE).val()) },0 ));
        // $($(crrElement).parent().parent().find('.total').get(0)).html( $(crrElement).parent().parent().find('.throwInput').toArray().reduce((id,crrE,total)=>{ return (total + (($(crrE).val() == "" ? 0 : parseInt($(crrE).val()) ))); },0 ));
        let total = 0;
        $(crrElement).parent().parent().find('.throwInput').toArray().forEach(element => {
            if($(element).val() != ""){
                total += parseInt($(element).val());
            }
        });
        $($(crrElement).parent().parent().find('.total').get(0)).html(total);
        score[$(crrElement).attr('playerId')] = $('.throwInput.'+$(crrElement).attr('playerId')).toArray().reduce((total,crrElem)=>{ return total + (($(crrElem).val() != "") ? parseInt($(crrElem).val()) : 0);},0);
        currentRound = $(crrElement).attr('roundNumber');
        showWhosTheBoss();
    });

    $(document).on('keyup','.playerNameHolder',(e)=>{
        if(e.keyCode == 13 || e.key == "Enter"){
            $('.addPlayer').trigger('click');        
        }
    });

    $('.addPlayer').click((e)=>{
        $('.playerNameHolder').append(getSinglePlayerName());
        $('.playerName:last-child').focus();
    });

    // $('.playerName:first-child').val('mun');
    // $('.addPlayer').click();
    // $('.playerName:last-child').val('hafi');
    // $('.numberOfRounds').val(3);
    // $('.startTheGame').click();

});
