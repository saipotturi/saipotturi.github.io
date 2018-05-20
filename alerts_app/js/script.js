//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) {
		$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
			function(request)
			{
				var count = request.responseText.split(/\r\n|\r|\n/).length;
				if(count === 2)
				{
					document.querySelector("#Thunderbolt").style.backgroundColor = "red";
				}
				document.querySelector("#Thunderbolt").querySelector("p").innerHTML = count;
				//document.querySelector("#Thunderbolt")
				//	.innerHTML = request.responseText;
			}
		);

	}
);
