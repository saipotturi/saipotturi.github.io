( function (global) {

var clusterTileUrl = "snippets/cluster-tile.html";
var popupUrl = "snippets/popup.html";
var testhtml = "snippets/menu-item.html";

var insertHtml = function (selector, html) {
  console.log(html);
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML += html;
};

var appendHtml = function (selector, html) {
  console.log(html);
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML += html;
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  console.log(string);
  return string;
};

//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) {

		$ajaxUtils.sendGetRequest("data/cluster_list", 
			loadClusterTiles, false);

	//	$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
	//		loadHealth);

	}
);

setInterval('window.location.reload(true)', 180000);

//setInterval(refreshStatus, 180000);

function refreshStatus()
{
	$ajaxUtils.sendGetRequest("data/cluster_list", 
			refreshClusterTiles, false);
}


async function refreshClusterTiles(cluster_list)
{
	//var clusters = ["Thunderbolt", "CM_tagging"];
	//var clusters = ["CM_tagging"];
	var clusters = cluster_list.split(/\r\n|\r|\n/);
	console.log(clusters);
	var cluster_count = clusters.length;

	var aggr_html = "";

		for(var i=0; i<cluster_count; i++)
	{
		await status_func(clusters[i]);

		//await status_func(clusters[i]);
	}

}

/*

function loadClusterTiles(cluster_list)
{
	//var clusters = ["Thunderbolt", "CM_tagging"];
	var clusters = ["CM_tagging"];
	//var clusters = cluster_list.split(/\r\n|\r|\n/);
	console.log(clusters);
	var cluster_count = clusters.length;
	
	var aggr_html = "";

	for(var i=0; i<cluster_count; i++)
	{
		var cluster_name = clusters[i];
		$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(clusterTileUrl)
			{
				var tileHtml = insertProperty(clusterTileUrl, "cluster_variable", cluster_name);

				aggr_html = aggr_html + tileHtml;

				console.log(aggr_html);
			}
		,false);

		insertHtml("#cluster_row", aggr_html);

	}

	for(var i=0; i<cluster_count; i++)
	{
		$ajaxUtils.sendGetRequest(`data/${cluster_name}.txt`, function(request)
			{
				console.log(request);
				var count = request.split(/\r\n|\r|\n/).length;
				console.log(cluster_name);
	
				if(count > 1)
				{
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "green";
				}
				document.querySelector(`#${cluster_name}`).querySelector("p").innerHTML = count;
			}, false);
		
	}
}

*/

//************ Create the 2 new functions here **************//


function appnd_func(cluster_name)
{
	return new Promise(function(resolve, reject)
	{
		$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(clusterTileUrl)
			{
				var tileHtml = insertProperty(clusterTileUrl, "cluster_variable", cluster_name);
				console.log(cluster_name);

				console.log(tileHtml);


				insertHtml("#cluster_row", tileHtml);

				status_func(cluster_name);


			}
		,false);


		resolve(null);
	}
	)
	
	

}


function status_func(cluster_name)
{
	return new Promise(function(resolve, reject)
	{
		$ajaxUtils.sendGetRequest(`data/${cluster_name}.txt`, function(request)
			{
				console.log(request);
				var count = request.split(/\r\n|\r|\n/).length;
				
				console.log(cluster_name);

				if(count > 1)
				{
					console.log("nee count red : "+count);
					document.querySelector(`#${cluster_name}`).querySelector("#inner_box").style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					console.log("nee count yellow : "+count);
					document.querySelector(`#${cluster_name}`).querySelector("#inner_box").style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector(`#${cluster_name}`).querySelector("#inner_box").style.backgroundColor = "green";
				}

				document.querySelector(`#${cluster_name}`).querySelector("#inner_box").querySelector("p").innerHTML = count;

				document.querySelector(`#${cluster_name}`).querySelector("#popup").querySelector("p").innerHTML = request;

				document.querySelector(`#${cluster_name}`).onmouseover = function() { 
					document.querySelector(`#${cluster_name}`).querySelector("#popup").style.display = 'block';
				};

				document.querySelector(`#${cluster_name}`).onmouseout = function() { 
					document.querySelector(`#${cluster_name}`).querySelector("#popup").style.display = 'none';
				};


			}, false);


		resolve(null);
	}
	)
	
}



//**********************************************************//




async function loadClusterTiles(cluster_list)
{
	//var clusters = ["Thunderbolt", "CM_tagging"];
	//var clusters = ["CM_tagging"];
	var clusters = cluster_list.split(/\r\n|\r|\n/);
	console.log(clusters);
	var cluster_count = clusters.length;

	var aggr_html = "";

//*********************
/*
	var index = 0;

	function test_async(callback)
	{
		console.log(callback);
		if(index < clusters.length)
		{
			console.log(index);
			var cluster_name = clusters[index];

			$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(clusterTileUrl)
			{
				var tileHtml = insertProperty(clusterTileUrl, "cluster_variable", cluster_name);
				console.log(cluster_name);

				aggr_html += tileHtml;
				console.log(aggr_html);


				//insertHtml("#cluster_row", tileHtml);

				insertHtml("#cluster_row", aggr_html);

			}
		,false);

			index++;

			test_async();
		}
	
		callback()
	
	}


	function test_async_2()
	{
		if(index < clusters.length)
		{
			var cluster_name = clusters[index];

			$ajaxUtils.sendGetRequest(`data/${cluster_name}.txt`, function(request)
			{
				console.log(request);
				var count = request.split(/\r\n|\r|\n/).length;
				
				console.log(cluster_name);

				if(count > 1)
				{
					console.log("nee count red : "+count);
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					console.log("nee count yellow : "+count);
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector(`#${cluster_name}`).style.backgroundColor = "green";
				}
				document.querySelector(`#${cluster_name}`).querySelector("p").innerHTML = count;
			}, false);

			index++;

			test_async_2();

		}
	}

	test_async(test_async_2);
*/	

//****************************


//************ Promise **************//


	for(var i=0; i<cluster_count; i++)
	{
		await appnd_func(clusters[i]);

		//await status_func(clusters[i]);
	}


//************ Promise **************//


/*
	
	for(var i=0; i<cluster_count; i++)
	{
		//var cluster_name = clusters[i];
		$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(clusterTileUrl)
			{
				var tileHtml = insertProperty(clusterTileUrl, "cluster_variable", clusters[i]);
				console.log(clusters[i]);

				aggr_html += tileHtml;
				console.log(aggr_html);


				//insertHtml("#cluster_row", tileHtml);

				insertHtml("#cluster_row", aggr_html);

			}
		,false);
    }
    
	for(var i=0; i<cluster_count; i++)
	{
		$ajaxUtils.sendGetRequest(`data/${clusters[i]}.txt`, function(request)
			{
				console.log(request);
				var count = request.split(/\r\n|\r|\n/).length;
				
				console.log(clusters[i]);

				if(count > 1)
				{
					console.log("nee count red : "+count);
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					console.log("nee count yellow : "+count);
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "green";
				}
				document.querySelector(`#${clusters[i]}`).querySelector("p").innerHTML = count;
			}, false);

	}

*/	

}



/*
function loadHealth(request)
{
	var count = request.responseText.split(/\r\n|\r|\n/).length;
	if(count > 1)
	{
		document.querySelector("#Thunderbolt").style.backgroundColor = "red";
	}
	else if(count == 1)
	{
		document.querySelector("#Thunderbolt").style.backgroundColor = "yellow";
	}
	else
	{
		document.querySelector("#Thunderbolt").style.backgroundColor = "green";
	}
	document.querySelector("#Thunderbolt").querySelector("p").innerHTML = count;
				//document.querySelector("#Thunderbolt")
				//	.innerHTML = request.responseText;
}
*/

})(window);


//https://stackoverflow.com/questions/12359450/javascript-loop-and-wait-for-function
//https://codeburst.io/javascript-promises-explained-with-simple-real-life-analogies-dd6908092138