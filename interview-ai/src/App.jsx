import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InterviewProvider } from "./context/InterviewContext";

import Landing from "./pages/Landing";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";
import Report from "./pages/Report";

function App() {
  return (
    <InterviewProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </InterviewProvider>
  );
}

export default App;