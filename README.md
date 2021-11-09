## Discord Voting Bot

A custom voting bot that counts the reactions to a message.
The bot takes advantage of discord.js and the Discord API. There
are 4 different types of voting that can be done. Voting, majority voting,
 conviction voting, and quadratic voting.


## Authors

- [@Dvent1123](https://www.github.com/Dvent1123)

## Tech Stack

**Bot:** Discord.js


## Commands

#### Voting

Regular voting style that counts only the reactions from a specified role 
within a specified time limit set in seconds.

```http
  -voting <Guild ID/Name> <Specified Role> <Time Limit (secs)> <Question>
```

#### Majority

Majority voting based on a percentage of voters who are allowed to vote.

```http
  -majority <Guild ID/Name> <Specified Role> <Percentage> <Question>
```

#### Conviction

Regular voting with an increase in weight of the member's vote over time. The
increase will happen in the regular intervals based on what was specified. With 
the multiplier being a percent. 

```http
  -conviction <Guild ID/Name> <Specified Role> <Time Limit (secs)> <Intervals> <Multiplier (percent)> <Question>
```

#### Quadratic

Quadratic voting limits the number of reactions per member. Then tracks the number
of reactions members have given to an active proposal

```http
  -quadratic <Guild ID/Name> <Specified Role> <Reaction Limit> <Question>
```
