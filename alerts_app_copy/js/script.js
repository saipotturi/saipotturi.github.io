( function (global) {

var clusterTileUrl = "snippets/cluster-tile.html";
var testhtml = "snippets/menu-item.html";

var insertHtml = function (selector, html) {
  console.log(selector);		
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
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

function loadClusterTiles(cluster_list)
{
	//var clusters = ["Thunderbolt", "CM_tagging"];
	//var clusters = ["Thunderbolt"];
	var clusters = cluster_list.split(/\r\n|\r|\n/);
	console.log(clusters);
	var cluster_count = clusters.length;
	
	for(var i=0; i<cluster_count; i++)
	{
		var cluster_name = clusters[i];
		console.log("Hello : "+cluster_name)
		$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(clusterTileUrl)
			{
				var tileHtml = insertProperty(clusterTileUrl, "cluster_variable", cluster_name);
				console.log(tileHtml);
				insertHtml("#cluster_row", tileHtml);
			}
		,false);

		$ajaxUtils.sendGetRequest(`data/${cluster_name}.txt`, function(request)
			{
				console.log(request);
				var count = request.split(/\r\n|\r|\n/).length;
				console.log(cluster_name);
				if(cluster_name == "Thunderbolt")
					console.log("YYYYYYYYYYYYYYYYYYY");
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
		console.log(i);
		console.log(cluster_name);
	}
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