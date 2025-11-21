const { useState, useEffect, useRef } = React;

// Utility Functions
const formatDateHeader = (date) => {
    const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
    const dayOfWeek = days[date.getDay()];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dayOfWeek} ${month}/${day}`;
};

const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const isToday = (date) => {
    const today = new Date();
    return getDateKey(date) === getDateKey(today);
};

const isSameDay = (date1, date2) => {
    return getDateKey(date1) === getDateKey(date2);
};

// Generate array of dates for grid
const getGridDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date);
    }
    return dates;
};

// Streak Manager
const getFlameColor = (streak) => {
    if (streak === 0) {
        return { color: '#FF6B35', opacity: 0.5 };
    } else if (streak < 10) {
        return { color: '#FF6B35', opacity: 0.8 };
    } else if (streak < 25) {
        return { color: '#FF4500', opacity: 0.9 };
    } else {
        const intensity = Math.min(streak / 50, 1);
        return { color: `rgb(${255}, ${Math.floor(215 * intensity)}, 0)`, opacity: 1 };
    }
};

// Local Storage Manager
const STORAGE_KEY = 'mealtracker_meals';

const saveMeals = (meals) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
};

const loadMeals = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const meals = JSON.parse(saved);
        // Convert date strings back to Date objects
        return meals.map(meal => ({
            ...meal,
            date: new Date(meal.date),
            timestamp: new Date(meal.timestamp)
        }));
    }
    return [];
};

// Components
const StreakView = ({ streak }) => {
    const flameStyle = getFlameColor(streak);
    
    return (
        <div className="streak-container">
            <div className="streak-badge">
                <span 
                    className="flame-icon" 
                    style={{ 
                        color: flameStyle.color,
                        opacity: flameStyle.opacity 
                    }}
                >
                    🔥
                </span>
                <span className="streak-count">{streak}</span>
            </div>
        </div>
    );
};

const MealSquare = ({ meal, onClick }) => {
    return (
        <div 
            className={`meal-square ${meal.rating}`}
            onClick={onClick}
        />
    );
};

const DayColumn = ({ date, meals, onDateClick, onMealClick }) => {
    return (
        <div className={`day-column ${isToday(date) ? 'today' : ''}`}>
            <div className="day-header" onClick={() => onDateClick(date)}>
                {formatDateHeader(date)}
            </div>
            <div className="meals-stack">
                {meals.map(meal => (
                    <MealSquare 
                        key={meal.id} 
                        meal={meal} 
                        onClick={() => onMealClick(meal)}
                    />
                ))}
            </div>
        </div>
    );
};

const MealLogSheet = ({ show, onClose, onSave, editingMeal }) => {
    const [rating, setRating] = useState(editingMeal?.rating || 'good');
    const [notes, setNotes] = useState(editingMeal?.notes || '');

    useEffect(() => {
        if (show) {
            if (editingMeal) {
                setRating(editingMeal.rating);
                setNotes(editingMeal.notes || '');
            } else {
                setRating('good');
                setNotes('');
            }
        }
    }, [show, editingMeal]);

    if (!show) return null;

    const handleSave = () => {
        onSave({ rating, notes: notes.trim() || null });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>Cancel</button>
                    <h2 className="modal-title">{editingMeal ? 'Edit Meal' : 'Log Meal'}</h2>
                    <div style={{ width: '60px' }}></div>
                </div>
                <div className="modal-body">
                    <div className="rating-section">
                        <h3 className="section-title">How was this meal?</h3>
                        <div className="rating-options">
                            {['good', 'neutral', 'bad'].map(r => (
                                <button
                                    key={r}
                                    className={`rating-button ${rating === r ? 'selected' : ''}`}
                                    onClick={() => setRating(r)}
                                >
                                    <div 
                                        className="rating-color" 
                                        style={{ 
                                            backgroundColor: r === 'good' ? '#4CAF50' : 
                                                           r === 'neutral' ? '#FFC107' : '#F44336' 
                                        }}
                                    />
                                    <span className="rating-label">
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="notes-section">
                        <h3 className="section-title">Notes (optional)</h3>
                        <textarea
                            className="notes-input"
                            placeholder="Add notes about this meal..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        className="save-button"
                        style={{ 
                            backgroundColor: rating === 'good' ? '#4CAF50' : 
                                           rating === 'neutral' ? '#FFC107' : '#F44336' 
                        }}
                        onClick={handleSave}
                    >
                        {editingMeal ? 'Update Meal' : 'Log Meal'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DayDetailView = ({ show, date, meals, onClose, onEdit, onDelete }) => {
    if (!show || !date) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <div style={{ width: '60px' }}></div>
                    <h2 className="modal-title">{formatDate(date)}</h2>
                    <button className="modal-close" onClick={onClose}>Done</button>
                </div>
                <div className="modal-body">
                    {meals.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🍽️</div>
                            <div className="empty-title">No meals logged</div>
                            <div className="empty-subtitle">Tap the + button to log a meal</div>
                        </div>
                    ) : (
                        <div className="meals-list">
                            {meals.map(meal => (
                                <div key={meal.id} className="meal-item">
                                    <div 
                                        className="meal-color-indicator"
                                        style={{ 
                                            backgroundColor: meal.rating === 'good' ? '#4CAF50' : 
                                                           meal.rating === 'neutral' ? '#FFC107' : '#F44336' 
                                        }}
                                    />
                                    <div className="meal-info">
                                        <div className="meal-header">
                                            <span className="meal-rating-name">
                                                {meal.rating.charAt(0).toUpperCase() + meal.rating.slice(1)}
                                            </span>
                                            <span className="meal-time">{formatTime(meal.timestamp)}</span>
                                        </div>
                                        {meal.notes && (
                                            <div className="meal-notes">{meal.notes}</div>
                                        )}
                                        <div className="meal-actions">
                                            <button 
                                                className="meal-action-button edit-button"
                                                onClick={() => onEdit(meal)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="meal-action-button delete-button"
                                                onClick={() => onDelete(meal)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main App
const App = () => {
    const [meals, setMeals] = useState([]);
    const [showMealLog, setShowMealLog] = useState(false);
    const [showDayDetail, setShowDayDetail] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingMeal, setEditingMeal] = useState(null);
    const gridRef = useRef(null);

    // Load meals on mount
    useEffect(() => {
        setMeals(loadMeals());
    }, []);

    // Save meals whenever they change
    useEffect(() => {
        if (meals.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            saveMeals(meals);
        }
    }, [meals]);

    // Scroll to today on mount
    useEffect(() => {
        if (gridRef.current) {
            setTimeout(() => {
                gridRef.current.scrollLeft = gridRef.current.scrollWidth;
            }, 100);
        }
    }, []);

    const getMealsForDate = (date) => {
        return meals
            .filter(meal => isSameDay(meal.date, date))
            .sort((a, b) => a.timestamp - b.timestamp);
    };

    const handleAddMeal = ({ rating, notes }) => {
        if (editingMeal) {
            // Update existing meal
            setMeals(meals.map(m => 
                m.id === editingMeal.id 
                    ? { ...m, rating, notes, timestamp: new Date() }
                    : m
            ));
        } else {
            // Add new meal
            const newMeal = {
                id: Date.now().toString(),
                date: new Date(),
                rating,
                notes,
                timestamp: new Date()
            };
            setMeals([...meals, newMeal]);
        }
        setShowMealLog(false);
        setEditingMeal(null);
    };

    const handleEditMeal = (meal) => {
        setEditingMeal(meal);
        setShowMealLog(true);
        setShowDayDetail(false);
    };

    const handleDeleteMeal = (meal) => {
        if (confirm('Delete this meal?')) {
            setMeals(meals.filter(m => m.id !== meal.id));
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowDayDetail(true);
    };

    const handleMealClick = (meal) => {
        setEditingMeal(meal);
        setShowMealLog(true);
    };

    const handleCloseMealLog = () => {
        setShowMealLog(false);
        setEditingMeal(null);
    };

    const handleCloseDayDetail = () => {
        setShowDayDetail(false);
        setSelectedDate(null);
    };

    const gridDates = getGridDates();
    const streak = meals.length;

    return (
        <div className="app-container">
            <StreakView streak={streak} />
            
            <div className="grid-container" ref={gridRef}>
                <div className="grid-scroll">
                    {gridDates.map(date => (
                        <DayColumn
                            key={getDateKey(date)}
                            date={date}
                            meals={getMealsForDate(date)}
                            onDateClick={handleDateClick}
                            onMealClick={handleMealClick}
                        />
                    ))}
                </div>
            </div>

            <button 
                className="fab"
                onClick={() => {
                    setEditingMeal(null);
                    setShowMealLog(true);
                }}
            >
                +
            </button>

            <MealLogSheet
                show={showMealLog}
                onClose={handleCloseMealLog}
                onSave={handleAddMeal}
                editingMeal={editingMeal}
            />

            <DayDetailView
                show={showDayDetail}
                date={selectedDate}
                meals={selectedDate ? getMealsForDate(selectedDate) : []}
                onClose={handleCloseDayDetail}
                onEdit={handleEditMeal}
                onDelete={handleDeleteMeal}
            />
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
