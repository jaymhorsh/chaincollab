'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';

interface CustomizeChannelDialogProps {
  initialValues: {
    bgColor: string;
    fontSize: string;
    textColor: string;
  };
  onSave: (newSettings: {
    bgColor: string;
    fontSize: string;
    textColor: string;
  }) => void;
}

export function CustomizeChannelDialog({ initialValues, onSave }: CustomizeChannelDialogProps) {
  const [bgColor, setBgColor] = useState(initialValues.bgColor);
  const [fontSize, setFontSize] = useState(initialValues.fontSize);
  const [textColor, setTextColor] = useState(initialValues.textColor);

  // Preset colors for background and text
const presetBgColors = ['white', 'red', 'green', 'blue', 'yellow', 'orange'];
const presetTextColors = ['black', 'red', 'green', 'blue', 'purple', 'gray'];

  // Update state when initial values change (e.g. after reading from localStorage)
  useEffect(() => {
    setBgColor(initialValues.bgColor);
    setFontSize(initialValues.fontSize);
    setTextColor(initialValues.textColor);
  }, [initialValues]);

  const handleSave = () => {
    const newSettings = { bgColor, fontSize, textColor };
    localStorage.setItem('channelCustomization', JSON.stringify(newSettings));
    onSave(newSettings);

  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-background-gray px-4 py-2 hover:bg-gray-200 transition-colors">
          Customize Channel
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-white rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-2xl font-bold mb-4">Customize Channel</Dialog.Title>
          <div className="space-y-6">
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <div className="flex items-center space-x-2">
                {presetBgColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setBgColor(color)}
                    className={`w-8 h-8 rounded-full border ${bgColor === color ? 'ring-2 ring-main-blue' : 'ring-0'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 p-0 border-0"
                />
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size (px)</label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full"
                />
                <span className="w-10 text-center">{fontSize}px</span>
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <div className="flex items-center space-x-2">
                {presetTextColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setTextColor(color)}
                    className={`w-8 h-8 rounded-full border ${textColor === color ? 'ring-2 ring-main-blue' : 'ring-0'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 p-0 border-0"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Dialog.Close >
              <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close >
             <button onClick={handleSave} className="px-4 py-2 bg-main-blue text-white rounded-md hover:bg-blue-600 transition-colors">
              Save
            </button>
            </Dialog.Close>    
           
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
