//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) {
		$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
			function(request)
			{
				var count = request.responseText.split(/\r\n|\r|\n/).length;

				document.querySelector("#Thunderbolt").p.innerHTML = count;
				//document.querySelector("#Thunderbolt")
				//	.innerHTML = request.responseText;
			}
		);

	}
);
