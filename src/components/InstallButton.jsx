import { useEffect, useState } from 'react';

function InstallButton() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    const onInstalled = () => setPrompt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!prompt) return null;

  return (
    <button
      type="button"
      className="install"
      onClick={async () => {
        await prompt.prompt();
        setPrompt(null);
      }}
    >
      Install app
    </button>
  );
}

export default InstallButton;
