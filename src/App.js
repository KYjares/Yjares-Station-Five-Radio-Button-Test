import "./App.css";
import menu from "./components/data";
import { useState } from "react";

const App = () => {
	const [selectedId, setSelectedId] = useState([]);

	const handleClick = (id, idx) => {
		var updatedId = [...selectedId];
		updatedId[idx] = id;
		setSelectedId(updatedId);
	};

	const toggleDisable = (id, idx) => {
		if (!selectedId[idx - 1]) {
			return true;
		}
		for (let currentId of selectedId) {
			if (menu.rules[currentId]) {
				if (menu.rules[currentId].includes(parseInt(id))) {
					return true;
				}
			}
		}
		return false;
	};

	return (
		<div className="App">
			<form className="form-body" onSubmit={() => alert("Form Submitted.")}>
				<h3>Group 1</h3>
				{menu.menus[0].map((d) => (
					<div>
						<input
							type="radio"
							value={d.value}
							name="0"
							onChange={() => handleClick(d.id, 0)}
						/>{" "}
						{d.value}
						<br />
					</div>
				))}
				<br />
				{menu.menus.slice(1).map((item, idx) => {
					return (
						<div>
							<h3>Group {idx + 2}</h3>
							{item.map((d) => {
								return (
									<div>
										<input
											type="radio"
											value={d.value}
											name={idx + 1}
											disabled={toggleDisable(d.id, idx + 1)}
											onChange={() => handleClick(d.id, idx + 1)}
										/>{" "}
										{d.value}
									</div>
								);
							})}
							<br />
						</div>
					);
				})}
				<div className="button-panel">
					<button
						type="submit"
						className="button"
						disabled={!selectedId[menu.menus.length - 1]}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default App;
