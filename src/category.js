import randomColor from 'randomcolor';

const Category = (categoryTitle) => {
	let title = categoryTitle;
	let color = randomColor();
	const relatedTasks = [];

	const getTitle = () => title;
	const setTitle = (newTitle) => {
		title = newTitle;
	};

	const getTasks = () => relatedTasks; //sort near here
	const addTask = (task) => {
		relatedTasks.push(task);
	};
	const addTasks = (taskList) => {
		taskList.forEach((e) => {
			addTask(e);
		});
	};

	const getColor = () => color;
	const newColor = () => {
		color = randomColor();
	};

	return {
		getTitle,
		setTitle,
		getTasks,
		addTask,
		addTasks,
		getColor,
		newColor,
	};
};

export { Category };
