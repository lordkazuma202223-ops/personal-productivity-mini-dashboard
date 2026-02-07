'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Check,
  Trash2,
  Clock,
  Target,
  Play,
  Pause,
  RotateCcw,
  Edit2,
  Save,
  Flame,
  Star,
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  Circle,
  Moon,
  Sun,
  Minus,
} from 'lucide-react';
import { StatsSkeleton, TaskListSkeleton, NotesGridSkeleton } from '@/components/Skeleton';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: Date;
};

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
};

type Habit = {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompleted: Date | null;
};

type Goal = {
  id: string;
  title: string;
  progress: number;
  target: number;
  unit: string;
  deadline: Date;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [newHabit, setNewHabit] = useState('');
  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '', deadline: '' });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Focus Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  // Stats
  const [tasksCompletedToday, setTasksCompletedToday] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedNotes = localStorage.getItem('notes');
    const savedHabits = localStorage.getItem('habits');
    const savedGoals = localStorage.getItem('goals');
    const savedStats = localStorage.getItem('stats');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      const today = new Date().toDateString();
      if (stats.date === today) {
        setTasksCompletedToday(stats.tasksCompletedToday);
        setTotalFocusTime(stats.totalFocusTime);
      }
    }
    setIsLoading(false);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            // Handle timer completion
            if (timerMode === 'work') {
              setTotalFocusTime((prev) => prev + 25);
            }
            return timerMode === 'work' ? 5 * 60 : 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMode]);

  // Save stats
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(
      'stats',
      JSON.stringify({
        date: today,
        tasksCompletedToday,
        totalFocusTime,
      })
    );
  }, [tasksCompletedToday, totalFocusTime]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium',
        category: 'general',
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id && !task.completed) {
          setTasksCompletedToday((prev) => prev + 1);
        }
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-yellow-500',
      ];
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title || 'Untitled',
        content: newNote.content,
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const saveNote = () => {
    if (editingNote) {
      setNotes(notes.map((note) => (note.id === editingNote.id ? editingNote : note)));
      setSelectedNote(editingNote);
      setEditingNote(null);
    }
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit,
        streak: 0,
        completedToday: false,
        lastCompleted: null,
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          if (!habit.completedToday) {
            return {
              ...habit,
              completedToday: true,
              streak: habit.streak + 1,
              lastCompleted: new Date(),
            };
          }
          return {
            ...habit,
            completedToday: false,
            streak: Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const addGoal = () => {
    if (newGoal.title.trim() && newGoal.target && newGoal.unit && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        progress: 0,
        target: parseFloat(newGoal.target),
        unit: newGoal.unit,
        deadline: new Date(newGoal.deadline),
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', target: '', unit: '', deadline: '' });
    }
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: Math.min(progress, goal.target) } : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedHabits = habits.filter((h) => h.completedToday).length;

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* Header */}
      <header
        className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} sticky top-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Productivity Dashboard</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tasks Today</p>
                  <p className="text-2xl font-bold">{tasksCompletedToday}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Focus Time</p>
                  <p className="text-2xl font-bold">
                    {Math.floor(totalFocusTime / 60)}h {totalFocusTime % 60}m
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Flame className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Habit Streak</p>
                  <p className="text-2xl font-bold">
                    {habits.reduce((acc, h) => acc + h.streak, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Goals</p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks & Timer */}
          <div className="space-y-6">
            {/* Focus Timer */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                Focus Timer
              </h2>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 font-mono">{formatTime(timerSeconds)}</div>
                <div className="flex gap-2 justify-center mb-4">
                  <button
                    onClick={() => setTimerMode('work')}
                    className={`px-4 py-2 rounded-lg ${timerMode === 'work' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  >
                    Work
                  </button>
                  <button
                    onClick={() => setTimerMode('break')}
                    className={`px-4 py-2 rounded-lg ${timerMode === 'break' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  >
                    Break
                  </button>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={`px-6 py-3 rounded-lg ${timerRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold transition`}
                  >
                    {timerRunning ? (
                      <Pause className="w-5 h-5 inline" />
                    ) : (
                      <Play className="w-5 h-5 inline" />
                    )}
                    {timerRunning ? ' Pause' : ' Start'}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(timerMode === 'work' ? 25 * 60 : 5 * 60);
                    }}
                    className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Tasks
                <span className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeTasks} pending
                </span>
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a new task..."
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={addTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {isLoading ? (
                <TaskListSkeleton count={5} />
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} ${task.completed ? 'opacity-50' : ''}`}
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex-shrink-0 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      No tasks yet. Add one above!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Habits & Goals */}
          <div className="space-y-6">
            {/* Habits */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-500" />
                Habits
                <span className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {completedHabits}/{habits.length} today
                </span>
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                  placeholder="Add a new habit..."
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  onClick={addHabit}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                  >
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition ${habit.completedToday ? 'bg-green-500 text-white' : 'border-2 border-gray-400'}`}
                    >
                      {habit.completedToday && <Check className="w-5 h-5" />}
                    </button>
                    <div className="flex-1">
                      <p className="font-medium">{habit.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        🔥 {habit.streak} day streak
                      </p>
                    </div>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {habits.length === 0 && (
                  <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No habits yet. Start building streaks!
                  </p>
                )}
              </div>
            </div>

            {/* Goals */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Goals
              </h2>
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Goal title..."
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    placeholder="Target"
                    className={`w-1/2 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    placeholder="Unit (e.g., hours)"
                    className={`w-1/2 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                </div>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className={`w-1/2 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
                <button
                  onClick={addGoal}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Add Goal
                </button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {goals.map((goal) => {
                  const progressPercent = (goal.progress / goal.target) * 100;
                  const daysLeft = Math.ceil(
                    (goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={goal.id}
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{goal.title}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mb-2">
                        <div
                          className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                        >
                          <div
                            className="h-full bg-orange-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateGoalProgress(goal.id, goal.progress - 1)}
                          className={`p-1 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center">
                          {goal.progress} / {goal.target} {goal.unit}
                        </span>
                        <button
                          onClick={() => updateGoalProgress(goal.id, goal.progress + 1)}
                          className={`p-1 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {goals.length === 0 && (
                  <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No goals yet. Set your targets!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Notes */}
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Notes
            </h2>
            {!selectedNote ? (
              <>
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Note title..."
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  />
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Note content..."
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  />
                  <button
                    onClick={addNote}
                    className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    <Plus className="w-5 h-5 inline mr-2" />
                    Add Note
                  </button>
                </div>
                {isLoading ? (
                  <NotesGridSkeleton count={6} />
                ) : (
                  <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => setSelectedNote(note)}
                        className={`${note.color} p-4 rounded-lg cursor-pointer hover:opacity-90 transition transform hover:scale-105`}
                      >
                        <h3 className="font-semibold text-white mb-1 truncate">{note.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-3">{note.content}</p>
                      </div>
                    ))}
                    {notes.length === 0 && (
                      <p
                        className={`col-span-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                      >
                        No notes yet. Create one!
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setSelectedNote(null);
                    setEditingNote(null);
                  }}
                  className={`mb-4 px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition flex items-center gap-1`}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                {editingNote ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingNote.title}
                      onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    />
                    <textarea
                      value={editingNote.content}
                      onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                      rows={10}
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveNote}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{selectedNote.title}</h3>
                      <button
                        onClick={() => deleteNote(selectedNote.id)}
                        className="text-red-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap">{selectedNote.content}</p>
                    <button
                      onClick={() => setEditingNote(selectedNote)}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} mt-8 py-6`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Productivity Dashboard - Stay focused, stay productive
        </div>
      </footer>
    </div>
  );
}
