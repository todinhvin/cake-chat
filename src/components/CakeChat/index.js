import React from "react";
import axios from "axios";
import { emotions } from "../../constants";

const CakeChat = () => {
  const [state, setState] = React.useState({
    text: "",
    response: "",
    emotion: "neutral",
    loading: false,
    content: [
      "Type your message",
      "And response will be here with emotion you choose",
    ],
  });

  const getResponse = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    const data = await axios({
      method: "POST",
      url: "http://localhost:3005",
      data: {
        context: [state.text],
        emotion: state.emotion,
      },
    }).then((res) => res.data);
    setState((s) => ({
      ...s,
      loading: false,
      response: data.response,
      content: [...s.content, data.response],
    }));
  }, [state.text, state.emotion]);

  const changeEmotion = (value) => () => {
    setState((s) => ({ ...s, emotion: value }));
  };

  const handlePress = () => {
    if (state.text) {
      getResponse();
      setState((s) => ({
        ...s,
        text: "",
        content: [...s.content, state.text],
      }));
    }
  };

  const changeText = (e) => {
    setState((s) => ({ ...s, text: e.target.value }));
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <h4 style={{ textAlign: "left" }}>DEMO</h4>
        <div className="box_chat">
          {state.content.map((item, index) => {
            return (
              <p
                key={index}
                className="text"
                style={{
                  background: `${index % 2 !== 0 ? "#efecec" : "#CCC"}`,
                  marginRight: `${index % 2 !== 0 && "auto"}`,
                }}
              >
                {item}
              </p>
            );
          })}

          {state.loading && <p className="loading">Loading...</p>}

          <div style={{ display: "flex", alignSelf: "center" }}>
            <input
              type="text"
              required
              className="input_text"
              style={{
                pointerEvents: `${state.loading ? "none" : "unset"}`,
              }}
              onChange={changeText}
              value={`${state.text}`}
              placeholder="Type something"
            ></input>
            <button className="button_send" onClick={handlePress}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Emotion */}
      <div style={{ marginLeft: "20px" }}>
        {emotions.map((emotion, index) => (
          <div
            key={index}
            className={
              state.emotion === emotion.name ? "emotion active" : "emotion"
            }
            onClick={changeEmotion(emotion.name)}
          >
            {emotion.icon} {emotion.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CakeChat;
