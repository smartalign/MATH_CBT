import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Layout/Header';
import { useQuestions } from '../contexts/QuestionContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import './AddQuestion.css';

const AddQuestion = () => {
  const { addQuestion, updateQuestion, questions } = useQuestions();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef(null);

  const isEditing = Boolean(id);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    if (isEditing && id) {
      const question = questions.find(q => q.id === id);
      if (question) {
        setQuestionText(question.questionText);
        setOptions(question.options);
        setCorrectAnswer(question.correctAnswer);
        setTopic(question.topic || '');
        setDifficulty(question.difficulty || 'medium');

        if (editorRef.current) {
          editorRef.current.innerHTML = question.questionText;
        }
      } else {
        showToast('Question not found', 'error');
        navigate('/question-bank');
      }
    }
  }, [isEditing, id, questions, navigate, showToast]);

  const applyFormat = (command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setQuestionText(editorRef.current.innerHTML);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const validateForm = () => {
    if (!questionText.trim()) {
      showToast('Please enter a question', 'error');
      return false;
    }

    if (options.some(opt => !opt.trim())) {
      showToast('Please fill in all answer options', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isEditing && id) {
      updateQuestion(id, { questionText, options, correctAnswer, topic, difficulty });
      showToast('Question updated successfully!', 'success');
      navigate('/question-bank');
    } else {
      addQuestion({ questionText, options, correctAnswer, topic, difficulty });
      showToast('Question added successfully!', 'success');
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setTopic('');
      setDifficulty('medium');
      if (editorRef.current) editorRef.current.innerHTML = '';
    }
  };

  return (
    <div className="page-container">
      <Header
        title={isEditing ? "Edit Question" : "Add Question"}
        breadcrumb={isEditing ? "Manage Exam / Edit Question" : "Manage Exam / Add Question"}
      />

      <div className="page-content">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-section">
            <label className="form-label">
              Question Text <span className="required">*</span>
            </label>

            <div className="editor-toolbar">
              <button type="button" onClick={() => applyFormat('bold')}><Bold size={18} /></button>
              <button type="button" onClick={() => applyFormat('italic')}><Italic size={18} /></button>
              <button type="button" onClick={() => applyFormat('underline')}><Underline size={18} /></button>
              <div className="toolbar-divider" />
              <button type="button" onClick={() => applyFormat('insertUnorderedList')}><List size={18} /></button>
              <button type="button" onClick={() => applyFormat('insertOrderedList')}><ListOrdered size={18} /></button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              className="wysiwyg-editor"
              onInput={handleEditorChange}
              data-placeholder="Type your question here..."
            />
          </div>

          <div className="form-section">
            <label className="form-label">Answer Options <span className="required">*</span></label>
            <div className="options-grid">
              {options.map((option, index) => (
                <div key={index} className="option-input-group">
                  <span>{String.fromCharCode(65 + index)}.</span>
                  <input type="text" value={option} onChange={(e) => updateOption(index, e.target.value)} />
                  <input type="radio" checked={correctAnswer === index} onChange={() => setCorrectAnswer(index)} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Topic (Optional)</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="form-section">
              <label className="form-label">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">{isEditing ? 'Save Changes' : 'Add Question'}</button>
            <button type="button" onClick={() => navigate('/question-bank')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
