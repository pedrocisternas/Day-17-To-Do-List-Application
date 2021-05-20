import React, { useState } from "react";

//create your first component
export function Home() {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const addToList = inp => {
		setList([...list, inp]);
		setInput("");
	};
	const deleteFromList = indexToRemove => {
		let newList = list.filter((value, i) => i != indexToRemove);
		setList(newList);
	};
	const validateInput = () => {
		if (input === "") {
			alert("The input cannot be empty");
			return true;
		}
	};

	return (
		<div className="container bg-light">
			<h1 className="text-center">To Do List</h1>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Type task"
					aria-label="Type task"
					aria-describedby="basic-addon2"
					onChange={e => setInput(e.target.value)}
					value={input}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						type="button"
						id="button-addon2"
						onClick={() => {
							if (!validateInput()) addToList(input);
						}}>
						Add
					</button>
				</div>
			</div>
			<div className="row">
				<ul className="col-12">
					{list.map((value, index) => {
						return (
							<>
								<li
									className="d-flex justify-content-between"
									key={index}>
									{value}
									<span>
										<i
											className="fas fa-trash"
											onClick={() =>
												deleteFromList(index)
											}></i>
									</span>
								</li>
							</>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
