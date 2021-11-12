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

This is regular voting rules, limited to these reactions ['👍', '👎']. The user can either
vote with a '👍' or a '👎'. After the set time limit (in seconds) goes by a message will be sent with the results.
Votes will be limited to the specified role and in the server/guild that is mentioned.

```http
  -voting #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Question>
```

#### Majority

Majority voting has two different ways to end the voting poll, time limit as well as percentage, and limited to these reactions ['👍', '👎']. 
The time limit (in seconds)
sets how long the poll will stay open for and the percentage is the percentage majority needed to pass and is calculated by
totalRoleMembers * (percentage [user-input] / 100). Once the percentage or time limit is reached then the 

```http
  -majority #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Percentage> <Question>
```

#### Conviction

Voting with an increase in weight of the member's vote over time if they keep their vote
cast for a longer period of time. The
increase will happen in the regular intervals based on what was specified. With 
the multiplier being a percent. 

```http
  -conviction #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Intervals> <Multiplier (percent)> <Question>
```

#### Quadratic

Quadratic voting limits the number of reactions per member with the maximum reactions per user being 5 currently. 
They are allowed to pick from this set of reactions ['👍', '😀', '🤠','😗','😉']. Then tracks the number
of reactions members have given to an active proposal

```http
  -quadratic #<Guild ID/Name> @<Specified Role> <Reaction Limit> <Question>
```
