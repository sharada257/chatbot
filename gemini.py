
def ask_gemini(user_input):
    from google import genai

    client = genai.Client(api_key="your_gemini_api_key")

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=user_input
    )
    return response.text

# Chat loop
while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break
    print("Bot:", ask_gemini(user_input))
