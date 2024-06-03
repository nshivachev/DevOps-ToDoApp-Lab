const { test, expect } = require('@playwright/test');
const url = 'http://localhost:5500//DevOps-ToDoApp-Lab/';

//Verify if a user can add a task
test('user can add a task', async ({page}) => {
    await page.goto(url);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');
});

//Verify if a user can delete a task
test('user can delete a task', async ({page}) => {
    //Add a task
    await page.goto(url);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');

    //Delete a task
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
});

//Verify if a user can mark a task as complete
test('user can marks a task as complete', async ({page}) => {
    //Add a task
    await page.goto(url);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');

    //Mark the task as complete
    await page.click('.task .task-complete');

    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull;
});

//Verify if a user can filter
test('user can filter tasks', async ({page}) => {
    //Add a task
    await page.goto(url);
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');

    //Mark the task as complete
    await page.click('.task .task-complete');

    //Filter Tasks
    await page.selectOption('#filter', 'Completed');
    const incompletedTask = await page.$('.task:not(.completed)');
    expect(incompletedTask).toBeNull;
});