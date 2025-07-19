import React from 'react';

const SettingsPanel = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-5 rounded text-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="outputFormat">
            Output File Format
          </label>
          <select
            id="outputFormat"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="compression">
            Compression Settings
          </label>
          <select
            id="compression"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="none">None</option>
            <option value="lossless">Lossless</option>
            <option value="lossy">Lossy</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="imageQuality">
            Image Quality
          </label>
          <select
            id="imageQuality"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="1">Low</option>
            <option value="5">Medium</option>
            <option value="10">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="resizeOptions">
            Resize Options
          </label>
          <select
            id="resizeOptions"
            className="bg-white text-black border border-gray-400 rounded px-2 py-1"
          >
            <option value="none">None</option>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;