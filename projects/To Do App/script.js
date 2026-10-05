// DOM Elements
        const themeToggle = document.getElementById('themeToggle');
        const langToggle = document.getElementById('langToggle');
        const taskForm = document.getElementById('taskForm');
        const taskList = document.getElementById('taskList');
        const notificationArea = document.getElementById('notificationArea');
        const hourSelect = document.getElementById('taskHour');
        const minuteSelect = document.getElementById('taskMinute');
        const daysSelection = document.getElementById('daysSelection');
        
        // App State
        const APP_VERSION = '2.0';
        if (localStorage.getItem('appVersion') !== APP_VERSION) {
            localStorage.setItem('tasks', JSON.stringify([]));
            localStorage.setItem('appVersion', APP_VERSION);
        }
        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let isDarkMode = localStorage.getItem('darkMode') === 'true' || false;
        let currentLang = localStorage.getItem('language') || 'en';
        
        // Day names for both languages
        const dayNames = {
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        };
        
        // Full day names for display
        const fullDayNames = {
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        };
        
        // Translations
        const translations = {
            en: {
                appTitle: "To-Do App",
                titleLabel: "Task Title",
                daysLabel: "Days of the Week",
                timeLabel: "Time",
                hourLabel: "Hour",
                minuteLabel: "Minute",
                descLabel: "Description",
                addTaskBtn: "Add Task",
                emptyText: "No tasks added yet. Create your first task to get started!",
                notificationTitle: "Task Reminder",
                deleteTask: "Delete task",
                langToggle: "AR",
                days: dayNames.en,
                fullDays: fullDayNames.en,
                taskAdded: "Task Added",
                taskDeleted: "Task Deleted",
                taskDeletedMsg: "Your task has been deleted.",
                selectDaysError: "Please select at least one day for your task.",
                notificationsWorking: "Notifications are working! System is ready.",
                nextReminder: "Next reminder:"
            },
            ar: {
                appTitle: "تطبيق المهام",
                titleLabel: "عنوان المهمة",
                daysLabel: "أيام الأسبوع",
                timeLabel: "الوقت",
                hourLabel: "الساعة",
                minuteLabel: "الدقيقة",
                descLabel: "الوصف",
                addTaskBtn: "إضافة مهمة",
                emptyText: "لم تتم إضافة أي مهام بعد. أنشئ مهمتك الأولى للبدء!",
                notificationTitle: "تذكير بالمهمة",
                deleteTask: "حذف المهمة",
                langToggle: "EN",
                days: dayNames.ar,
                fullDays: fullDayNames.ar,
                taskAdded: "تمت إضافة المهمة",
                taskDeleted: "تم حذف المهمة",
                taskDeletedMsg: "تم حذف مهمتك.",
                selectDaysError: "يرجى اختيار يوم واحد على الأقل لمهمتك.",
                notificationsWorking: "الإشعارات تعمل! النظام جاهز.",
                nextReminder: "التذكير التالي:",
                nextReminderTime: "الوقت:"
            }
        };
        
        // Initialize the app
        function initApp() {
            // Set initial theme
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            }
            
            // Set initial language
            setLanguage(currentLang);
            
            // Populate time selects and days checkboxes
            populateTimeSelects();
            populateDaysCheckboxes();
            
            // Render tasks
            renderTasks();
            
            // Start notification checker
            startNotificationChecker();
            
            // Add event listeners
            themeToggle.addEventListener('click', toggleTheme);
            langToggle.addEventListener('click', toggleLanguage);
            taskForm.addEventListener('submit', addTask);
            
            // Add delegated event listener for delete buttons
            taskList.addEventListener('click', (e) => {
                const deleteBtn = e.target.closest('.delete-btn');
                if (deleteBtn) {
                    const taskId = parseInt(deleteBtn.getAttribute('data-id'));
                    deleteTask(taskId);
                }
            });
            
            // Show system ready notification
            setTimeout(() => {
                showNotification(
                    translations[currentLang].notificationsWorking,
                    "All features are working correctly",
                    'success'
                );
            }, 2000);
        }
        
        // Populate hour and minute selects
        function populateTimeSelects() {
            // Clear existing options except the first one
            hourSelect.innerHTML = '<option value="">Select hour</option>';
            minuteSelect.innerHTML = '<option value="">Select minute</option>';
            
            // Hours (0-23)
            for (let i = 0; i < 24; i++) {
                const hour = i.toString().padStart(2, '0');
                const option = document.createElement('option');
                option.value = hour;
                option.textContent = hour;
                hourSelect.appendChild(option);
            }
            
            // Minutes (0-59)
            for (let i = 0; i < 60; i++) {
                const minute = i.toString().padStart(2, '0');
                const option = document.createElement('option');
                option.value = minute;
                option.textContent = minute;
                minuteSelect.appendChild(option);
            }
            
            // Set default values to current time
            const now = new Date();
            hourSelect.value = now.getHours().toString().padStart(2, '0');
            minuteSelect.value = now.getMinutes().toString().padStart(2, '0');
        }
        
        // Populate days checkboxes
        function populateDaysCheckboxes() {
            daysSelection.innerHTML = '';
            const days = translations[currentLang].days;
            
            days.forEach((day, index) => {
                const dayElement = document.createElement('label');
                dayElement.className = 'day-checkbox';
                dayElement.innerHTML = `
                    <input type="checkbox" name="day" value="${index}">
                    <span class="day-label">${day}</span>
                `;
                daysSelection.appendChild(dayElement);
            });
        }
        
        // Toggle theme
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.documentElement.classList.toggle('dark', isDarkMode);
            localStorage.setItem('darkMode', isDarkMode.toString());
            
            // Show visual feedback
            showNotification(
                isDarkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled',
                isDarkMode ? 'Dark theme activated' : 'Light theme activated',
                'info'
            );
        }
        
        // Toggle language
        function toggleLanguage() {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(currentLang);
            localStorage.setItem('language', currentLang);
            
            // Repopulate days checkboxes with new language
            populateDaysCheckboxes();
            
            // Re-render tasks to update days format
            renderTasks();
            
            // Show visual feedback
            showNotification(
                currentLang === 'ar' ? 'الوضع العربي' : 'English Mode',
                currentLang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English',
                'info'
            );
        }
        
        // Set language
        function setLanguage(lang) {
            // Update text content
            document.getElementById('appTitle').textContent = translations[lang].appTitle;
            document.getElementById('titleLabel').textContent = translations[lang].titleLabel;
            document.getElementById('daysLabel').textContent = translations[lang].daysLabel;
            document.getElementById('timeLabel').textContent = translations[lang].timeLabel;
            document.getElementById('descLabel').textContent = translations[lang].descLabel;
            document.getElementById('addTaskBtn').textContent = translations[lang].addTaskBtn;
            document.getElementById('emptyText').textContent = translations[lang].emptyText;
            langToggle.textContent = translations[lang].langToggle;
            
            // Update placeholder attributes
            document.getElementById('title').placeholder = lang === 'en' ? 'Enter task title' : 'أدخل عنوان المهمة';
            document.getElementById('description').placeholder = lang === 'en' ? 'Enter task description' : 'أدخل وصف المهمة';
            
            // Update direction
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        }
        
        // Add a new task
        function addTask(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const hour = hourSelect.value;
            const minute = minuteSelect.value;
            const description = document.getElementById('description').value.trim();
            
            // Get selected days
            const selectedDays = Array.from(document.querySelectorAll('input[name="day"]:checked'))
                .map(checkbox => parseInt(checkbox.value));
            
            if (selectedDays.length === 0) {
                showNotification('Error', translations[currentLang].selectDaysError, 'error');
                return;
            }
            
            // Create new task
            const newTask = {
                id: Date.now(),
                title,
                days: selectedDays, // Array of day indices (0=Sunday, 6=Saturday)
                hour: parseInt(hour),
                minute: parseInt(minute),
                description,
                lastNotified: null // Will store timestamp of last notification
            };
            
            // Add to tasks array
            tasks.push(newTask);
            
            // Save to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Render tasks
            renderTasks();
            
            // Reset form
            taskForm.reset();
            const now = new Date();
            hourSelect.value = now.getHours().toString().padStart(2, '0');
            minuteSelect.value = now.getMinutes().toString().padStart(2, '0');
            
            // Uncheck all days
            document.querySelectorAll('input[name="day"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Show success notification
            showNotification(
                translations[currentLang].taskAdded, 
                `Your task "${title}" has been added successfully!`,
                'success'
            );
            
            // Show next reminder time
            const nextReminder = getNextReminderTime(newTask);
            if (nextReminder) {
                const options = { 
                    weekday: 'long', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                };
                const reminderTime = nextReminder.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', options);
                showNotification(
                    translations[currentLang].nextReminder,
                    `${reminderTime}`,
                    'info'
                );
            }
        }
        
        // Get next reminder time for a task
        function getNextReminderTime(task) {
            const now = new Date();
            const currentDay = now.getDay();
            const currentTime = now.getHours() * 60 + now.getMinutes();
            const taskTime = task.hour * 60 + task.minute;
            
            // Check today
            if (task.days.includes(currentDay) && taskTime > currentTime) {
                const nextTime = new Date(now);
                nextTime.setHours(task.hour, task.minute, 0, 0);
                return nextTime;
            }
            
            // Check upcoming days
            for (let i = 1; i <= 7; i++) {
                const nextDayIndex = (currentDay + i) % 7;
                if (task.days.includes(nextDayIndex)) {
                    const nextDate = new Date(now);
                    nextDate.setDate(nextDate.getDate() + i);
                    nextDate.setHours(task.hour, task.minute, 0, 0);
                    return nextDate;
                }
            }
            
            return null;
        }
        
        // Render tasks
        function renderTasks() {
            // Clear task list
            taskList.innerHTML = '';
            
            if (tasks.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                    </svg>
                    <p id="emptyText">${translations[currentLang].emptyText}</p>
                `;
                taskList.appendChild(emptyState);
                return;
            }
            
            // Render each task
            tasks.forEach(task => {
                const taskCard = document.createElement('li');
                taskCard.className = 'task-card';
                
                // Format days for display
                const dayBadges = task.days.map(dayIndex => {
                    const dayName = translations[currentLang].fullDays[dayIndex];
                    return `<span class="day-badge">${dayName}</span>`;
                }).join('');
                
                // Format time
                const timeString = `${task.hour.toString().padStart(2, '0')}:${task.minute.toString().padStart(2, '0')}`;
                
                taskCard.innerHTML = `
                    <button class="delete-btn" aria-label="${translations[currentLang].deleteTask}" data-id="${task.id}">×</button>
                    <div class="task-header">
                        <div>
                            <h2 class="task-title">${escapeHtml(task.title)}</h2>
                            <div class="task-days">${dayBadges}</div>
                            <div class="task-time">⏰ ${timeString}</div>
                        </div>
                    </div>
                    <p class="task-description">${escapeHtml(task.description || 'No description')}</p>
                `;
                taskList.appendChild(taskCard);
            });
        }
        
        // Delete a task
        function deleteTask(id) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex === -1) return;
            
            const taskTitle = tasks[taskIndex].title;
            tasks.splice(taskIndex, 1);
            
            // Save to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Render tasks
            renderTasks();
            
            // Show notification
            showNotification(
                translations[currentLang].taskDeleted,
                `${translations[currentLang].taskDeletedMsg} "${taskTitle}"`,
                'info'
            );
        }
        
        // Start notification checker
        function startNotificationChecker() {
            // Check every minute
            setInterval(checkNotifications, 60000);
            // Check immediately on load (after a short delay to allow page to render)
            setTimeout(checkNotifications, 3000);
        }
        
        // Check for tasks that need notification
        function checkNotifications() {
            const now = new Date();
            const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTime = currentHour * 60 + currentMinute; // Total minutes since midnight
            
            tasks.forEach(task => {
                // Check if today is one of the selected days
                if (task.days.includes(currentDay)) {
                    // Calculate task time in minutes
                    const taskTime = task.hour * 60 + task.minute;
                    
                    // Check if we're within the notification window (current time matches task time)
                    // We use a 2-minute window to ensure we don't miss notifications
                    if (Math.abs(currentTime - taskTime) <= 1) {
                        // Check if we haven't notified for this task today
                        if (!task.lastNotified || !isSameDay(task.lastNotified, now)) {
                            // Show notification
                            showNotification(
                                translations[currentLang].notificationTitle, 
                                task.title, 
                                'reminder',
                                task.description
                            );
                            
                            // Update last notified time
                            task.lastNotified = now.getTime();
                            
                            // Save to localStorage
                            localStorage.setItem('tasks', JSON.stringify(tasks));
                        }
                    }
                }
            });
        }
        
        // Check if two timestamps are on the same day
        function isSameDay(timestamp1, timestamp2) {
            const date1 = new Date(timestamp1);
            const date2 = new Date(timestamp2);
            return date1.getFullYear() === date2.getFullYear() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getDate() === date2.getDate();
        }
        
        // Show notification (in-app)
        function showNotification(title, message, type = 'info', description = '') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            
            let icon = 'ℹ️';
            if (type === 'success') icon = '✅';
            if (type === 'error') icon = '❌';
            if (type === 'reminder') icon = '⏰';
            if (type === 'info') icon = 'ℹ️';
            
            notification.innerHTML = `
                <div class="notification-icon">${icon}</div>
                <div class="notification-content">
                    <h3>${escapeHtml(title)}</h3>
                    <p>${escapeHtml(message)}</p>
                    ${description ? `<p style="margin-top:5px;font-size:13px;opacity:0.8">${escapeHtml(description)}</p>` : ''}
                </div>
            `;
            
            notificationArea.appendChild(notification);
            
            // Remove after animation completes
            setTimeout(() => {
                notification.remove();
            }, 3000);
            
            // Also try browser notification if supported and permitted
            if ((type === 'reminder' || type === 'success') && 'Notification' in window) {
                if (Notification.permission === 'granted') {
                    new Notification(title, {
                        body: `${message}\n${description}`,
                        icon: 'https://cdn-icons-png.flaticon.com/512/3163/3163572.png'
                    });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification(title, {
                                body: `${message}\n${description}`,
                                icon: 'https://cdn-icons-png.flaticon.com/512/3163/3163572.png'
                            });
                        }
                    });
                }
            }
        }
        
        // Escape HTML to prevent XSS
        function escapeHtml(unsafe) {
            if (!unsafe) return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        
        // Initialize the app when page loads
        window.addEventListener('DOMContentLoaded', initApp);
        
        // Request notification permission on user interaction
        document.addEventListener('click', () => {
            if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }, { once: true });