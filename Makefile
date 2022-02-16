deploy:
	 gcloud builds submit --tag gcr.io/firplakbot/dialogflow-twilio
	 gcloud beta run deploy --image gcr.io/firplakbot/dialogflow-twilio --update-env-vars GOOGLE_APPLICATION_CREDENTIALS=firplakbot-46c1f2704982.json --memory 1Gi
