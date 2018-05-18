//EVENT HANDLING
document.addEventListener("DOMContentLoaded",
	function (event) {
		$ajaxUtils.sendGetRequest("data/Thunderbolt.txt", 
			function(request)
			{
				document.querySelector("#Thunderbolt")
					.innerHTML = request;
			}
		);

	}
);
