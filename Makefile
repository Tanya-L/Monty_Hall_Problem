.PHONY: run runfe runbe
run: runfe runbe
runfe:
        cd client_monty_hall && screen -d -m npm start
runbe:
        cd server_monty_hall && screen -d -m npm run start