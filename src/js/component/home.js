import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setList(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const addToList = inp => {
		// setList(list.concat({ label: inp, done: false }));
		setInput("");

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas",
			{
				method: "PUT",
				body: JSON.stringify(
					list.concat({
						label: inp,
						done: false
					})
				),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(function(response) {
				console.log(response);
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				console.log(responseAsJson);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setList(responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	};

	const deleteFromList = indexToRemove => {
		let newList = list.filter((value, i) => i != indexToRemove);
		// setList(newList);

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas",
			{
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				console.log(responseAsJson);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setList(responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			});
	};

	const validateInput = () => {
		if (input === "") {
			alert("The input cannot be empty");
			return true;
		}
	};

	const changeStatus = index => {
		let newList = list.map((value, i) => {
			if (i == index) {
				value.done = !value.done;
				return value;
			} else {
				return value;
			}
		});

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas",
			{
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				console.log(responseAsJson);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/PedroCisternas"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setList(responseAsJson);
					})
					.catch(function(error) {
						console.log(
							"Looks like there was a problem: \n",
							error
						);
					});
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
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
						className="btn btn-primary"
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
							<React.Fragment key={index}>
								<li className="d-flex justify-content-md-between">
									{/* {value.label}{" "} */}
									<span>{value.label}</span>
									<span>
										<span className="text-danger font-italic mr-2">
											{value.done ? "done" : "not done"}
										</span>
										<i
											className="fas fa-check mr-2"
											onClick={() =>
												changeStatus(index)
											}></i>
										<i
											className="fas fa-trash"
											onClick={() =>
												deleteFromList(index)
											}></i>
									</span>
								</li>
							</React.Fragment>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
