const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

var sentence;

async function submitForm() {
  var form = document.getElementById("myForm");
  sentence = form.elements["name"].value;
  console.log(sentence);

  
  const prompt = `generate the correct grammar sentence of this sentence: ${sentence}`;

  await fetchTextFromOpenAI(prompt);
}

const maxTokens = 100;

async function fetchTextFromOpenAI(prompt) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].text;
    console.log('Generated Text:', generatedText);
    document.getElementById("matches").innerHTML = generatedText;
  } catch (error) {
    console.error('Error fetching text from OpenAI:', error.message);
  }
}
