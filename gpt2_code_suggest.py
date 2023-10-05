from transformers import GPT2LMHeadModel, GPT2Tokenizer
import sys

text_before_cursor = sys.argv[1]

# Load the pre-trained GPT-2 model and tokenizer.
model_name = "gpt2"  # You can use a different variant if needed.
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Generate code suggestions based on the input text.
input_ids = tokenizer.encode(text_before_cursor, return_tensors="pt")
suggested_ids = model.generate(input_ids, max_length=50, num_return_sequences=5)

suggestions = [tokenizer.decode(suggested_id) for suggested_id in suggested_ids]

# Send the suggestions back to the Node.js script as JSON.
print(json.dumps({"suggestions": suggestions}))
