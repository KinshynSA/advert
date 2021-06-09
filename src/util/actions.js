let api = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export async function get(u = '', params = {}){
	let url = new URL(`${api}${u}`)
	url.search = new URLSearchParams(params).toString();
	let response = await fetch(url)	
	console.log(response)
	/*let result = await response.text();
	return result*/

	const reader = response.body.getReader();

	// Шаг 2: получаем длину содержимого ответа
	const contentLength = +response.headers.get('Content-Length');

	// Шаг 3: считываем данные:
	let receivedLength = 0; // количество байт, полученных на данный момент
	let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
	while(true) {
		const {done, value} = await reader.read();

		if (done) {
			break;
		}

		chunks.push(value);
		receivedLength += value.length;

		console.log(`Получено ${receivedLength} из ${contentLength}`)
	}

	// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
	let chunksAll = new Uint8Array(receivedLength); // (4.1)
	let position = 0;
	for(let chunk of chunks) {
		chunksAll.set(chunk, position); // (4.2)
		position += chunk.length;
	}

	// Шаг 5: декодируем Uint8Array обратно в строку
	let result = new TextDecoder("utf-8").decode(chunksAll);
	console.log(result)

	// Готово!
	let commits = JSON.parse(result);
}

export async function post(u = '', body){
	let url = new URL(`${api}${u}`)

	console.log(url, body)
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(body)
	})

	let result = await response.json();
	return result
}