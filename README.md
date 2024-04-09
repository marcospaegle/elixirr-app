## Install

To install the project locally you need [docker](https://docker.com) and [kool.dev](http://kool.dev). run the commands below in you terminal.

1. run `kool run setup`
1. run `kool start`
1. access [portal](http://localhost:3000)

## Tests

To run the tests execute ``kool run artisan test`

## Stack

The choice of this stack is based on affinity and experience. For the proposed challenge, this stack solves the problem. I chose to use Docker because of the ease of having the same environment on several different machines and the kool tool to facilitate the use of Docker.

1. Database: MySQL 8.0
1. Backend: PHP 8.3 + Laravel 11
1. Frontend: NextJS
1. Docker + Kool

## Considerations

Several points of the application can be improved and should be refactored, I tried to deliver the best possible application in a short space of time.

Errors can be better handled and instead of throwing them in the console, redirecting them to a log file for example. I left it on the console on purpose.

In a real application, the user token must be stored in cookies. I didn't see the need to do this in this demonstration (be careful not to reload the page so as not to lose the current session).

Any other point can be discussed. This is not a production-ready application, the intention here is to show that I know what I'm doing.
