( function (global) {

var clusterTileUrl = "snippets/cluster-tile.html";

var insertHtml = function (selector, html) {
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
			loadClusterTiles);

	//	$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
	//		loadHealth);

	}
);

function loadClusterTiles(cluster_list)
{
	var clusters = ["Thunderbolt", "CM_tagging"];
	//var clusters = cluster_list.responseText.split(/\r\n|\r|\n/);
	var cluster_count = clusters.length;

	var titleHtml = insertProperty("<div id=\"{{cluster_variable}}\"", "cluster_variable", "Thunderbolt");
	console.log(titleHtml);
	console.log("hello");
	
	for(var i=0; i<cluster_count; i++)
	{
		var cluster_name = clusters[i];

		$ajaxUtils.sendGetRequest(clusterTileUrl, 
			function(request)
			{
				var tileHtml = insertProperty(request, "cluster_variable", cluster_name);

				insertHtml(cluster_row, tileHtml);
			}
		);

		$ajaxUtils.sendGetRequest(`"data/${cluster_name}"`, function(request)
			{
				var count = request.responseText.split(/\r\n|\r|\n/).length;
				if(count > 1)
				{
					document.querySelector(`"#${cluster_name}"`).style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					document.querySelector("#${cluster_name}").style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector("#${cluster_name}").style.backgroundColor = "green";
				}
				document.querySelector("#${cluster_name}").querySelector("p").innerHTML = count;
			});
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