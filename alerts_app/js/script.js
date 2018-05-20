//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) {
		$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
			function(request)
			{
				var count = request.responseText.split(/\r\n|\r|\n/).length;
				console.log("count : "+count);
				document.querySelector("#Thunderbolt").innerHTML = count;
				//document.querySelector("#Thunderbolt")
				//	.innerHTML = request.responseText;
			}
		);

	}
);
