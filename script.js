/**
 * Created by sstienface on 25/01/2019.
 */

function ajaxCall(params)
{
    if(params)
    {

        var url = params.url;
        var parameters = '?';
        for(var i in params.parameters)
        {
            parameters+=Object.keys(params.parameters[i])[0]+"="+params.parameters[i][Object.keys(params.parameters[i])[0]];
        }

        url+=parameters;

        var xhttp = new XMLHttpRequest();

        // Affichage de l'information de chargement

        document.getElementById('ajaxContent').innerHTML = "<div>Chargement en cours ...</div>";

        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById('ajaxContent').innerHTML = "";
                var json = JSON.parse(this.responseText);

                switch(params.parameters[0].action)
                {
                    case"affProducts":

                        for(var i in json)
                        {
                            var div = document.createElement('div');
                            div.innerHTML = "<h1>"+json[i].product_name+"</h1>";
                            div.innerHTML+= "<p>"+json[i].product_description+"</p>";
                            document.getElementById('ajaxContent').appendChild(div);

                        }

                        break;
                    case"affPurchased":

                        for(var i in json)
                        {
                            var div = document.createElement('div');
                            div.innerHTML = "<h4 style='color: indianred'>"+json[i].products_id+"</h4>";
                            div.innerHTML+= "<p style='color: darkgoldenrod'>"+json[i].product_name+"</p>";
                            div.innerHTML+= "<p>"+json[i].buyer_name+"</p>";
                            div.innerHTML+= "<p>"+json[i].buyer_address+"</p>";
                            document.getElementById('ajaxContentAchats').appendChild(div);

                        }

                        break;

                    default:
                        alert("Parametre non géré");
                        break;

                }


            }
        };

        xhttp.open("GET",url,true);

        xhttp.send();



        console.log("Sent an http request :"+url);


    }
}

document.getElementById('affProducts').addEventListener('click', function()
{
    ajaxCall(
        {'url' : 'ajax.php',
         'parameters' : [
                {'action' : 'affProducts'}
            ]
        }
    );

});


//Ajouter un event listener pour détecter le click sur le second lien

document.getElementById('affPurchased').addEventListener('click', function()
{
    ajaxCall(
        {'url' : 'ajax.php',
            'parameters' : [
                {'action' : 'affPurchased'}
            ]
        }
    );

});