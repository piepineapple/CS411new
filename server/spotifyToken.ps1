# Define the URL and the body of the request
$uri = "https://accounts.spotify.com/api/token"
$body = "grant_type=client_credentials&client_id=b0d18d7b0f12454d831907f3037179dc&client_secret=34f3fc2021eb48c587e0e46433498051"

# Create a dictionary to hold headers
$headers = @{"Content-Type" = "application/x-www-form-urlencoded" }

# Send the POST request
$response = Invoke-WebRequest -Uri $uri -Method Post -Body $body -Headers $headers

# Output the response content to a file named output.txt
$response.Content | Out-File -FilePath "output.txt"