

(function (global) {
//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) 
	{
		$ajaxUtils.sendGetRequest("data/cluster_list", loadClustersInfo);
		//$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", loadStatus);

	}
);


function loadClustersInfo(request)
{
	console.log(request);
	var clusters = ["Thunderbolt"];
	var cluster_count = clusters.length;
	
	for( var i=0; i<cluster_count; i++)
	{
		$ajaxUtils.sendGetRequest(`data/${clusters[i]}.txt`, function(request)
			{
				var count = request.responseText.split(/\r\n|\r|\n/).length;
				if(count > 1)
				{
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "red";
				}
				else if(count == 1)
				{
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "yellow";
				}
				else
				{
					document.querySelector(`#${clusters[i]}`).style.backgroundColor = "green";
				}
				document.querySelector(`#${clusters[i]}`).querySelector("p").innerHTML = count;
			}
		);
	}

	
}


function loadStatus(request)
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

}


})(window);

