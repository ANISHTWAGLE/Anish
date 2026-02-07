import React, { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, ListTodo, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('stellar-todos')
        return saved ? JSON.parse(saved) : []
    })
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        localStorage.setItem('stellar-todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        }

        setTodos([newTodo, ...todos])
        setInputValue('')
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const completedCount = todos.filter(t => t.completed).length

    return (
        <div className="app-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="todo-card"
            >
                <header className="app-header">
                    <div className="title-section">
                        <div className="logo-icon">
                            <Sparkles className="sparkle-icon" size={24} />
                        </div>
                        <div>
                            <h1 className="app-title">Stellar Todo</h1>
                            <p className="app-subtitle">Organize your tasks with elegance</p>
                        </div>
                    </div>
                    <div className="stats-badge">
                        {completedCount} / {todos.length}
                    </div>
                </header>

                <form onSubmit={addTodo} className="input-group">
                    <div className="input-wrapper">
                        <Plus className="plus-icon" size={20} />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Add a new task..."
                            className="todo-input"
                        />
                    </div>
                    <button type="submit" className="add-button">
                        Add Task
                    </button>
                </form>

                <div className="todo-list-container">
                    <AnimatePresence mode="popLayout">
                        {todos.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="empty-state"
                            >
                                <ListTodo size={48} className="empty-icon" />
                                <p>Your universe is clear. Start by adding a task!</p>
                            </motion.div>
                        ) : (
                            todos.map((todo) => (
                                <motion.div
                                    key={todo.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                                >
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className="check-button"
                                    >
                                        {todo.completed ? (
                                            <CheckCircle2 size={22} className="check-icon" />
                                        ) : (
                                            <Circle size={22} className="circle-icon" />
                                        )}
                                    </button>
                                    <span className="todo-text">{todo.text}</span>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="delete-button"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {todos.length > 0 && (
                    <footer className="card-footer">
                        <span className="progress-text">
                            {todos.length - completedCount} tasks remaining
                        </span>
                        <button
                            onClick={() => setTodos(todos.filter(t => !t.completed))}
                            className="clear-completed"
                        >
                            Clear Completed
                        </button>
                    </footer>
                )}
            </motion.div>
        </div>
    )
}

export default App
