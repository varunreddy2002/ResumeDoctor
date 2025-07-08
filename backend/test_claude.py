from claude import llm
from langchain.schema import HumanMessage, SystemMessage

resp = llm.invoke([
    SystemMessage(content="Reply with the single word: PONG."),
    HumanMessage(content="Ping?")
])

print("Bedrock response:", resp.content)
