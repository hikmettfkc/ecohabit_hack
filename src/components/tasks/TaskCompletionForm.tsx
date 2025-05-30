import React, { useState } from 'react';
import { Camera, X, Check, Image } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface TaskCompletionFormProps {
  onSubmit: (photo: string | null, note: string) => void;
  onCancel: () => void;
}

const TaskCompletionForm: React.FC<TaskCompletionFormProps> = ({ onSubmit, onCancel }) => {
  const { isDarkMode } = useTheme();
  const [photo, setPhoto] = useState<string | null>(null);
  const [note, setNote] = useState('');
  
  // Mock function to simulate photo upload
  const handlePhotoUpload = () => {
    // In a real app, this would handle actual file upload
    const mockPhoto = 'https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    setPhoto(mockPhoto);
  };
  
  return (
    <div className="space-y-4 mt-2">
      <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-2`}>
        <textarea
          placeholder="Share how you completed this task..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={`w-full resize-none outline-none ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
          rows={3}
        />
        
        {photo && (
          <div className="relative mt-2">
            <img src={photo} alt="Task completion" className="w-full h-32 object-cover rounded" />
            <button 
              onClick={() => setPhoto(null)}
              className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePhotoUpload}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } flex items-center gap-1`}
          >
            {photo ? <Image size={18} /> : <Camera size={18} />}
            <span className="text-sm">{photo ? 'Change photo' : 'Add photo'}</span>
          </button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onSubmit(photo, note)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={18} /> Submit
        </button>
        <button 
          onClick={onCancel}
          className={`py-2 px-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskCompletionForm;