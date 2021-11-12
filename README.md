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

Majority voting has two different ways to end the voting poll, time limit as well as percentage, and limited to these reactions ['👍', '👎']. The time limit (in seconds)
sets how long the poll will stay open for and the percentage is the percentage majority needed to pass and is calculated by totalRoleMembers * (percentage [user-input] / 100). Once the percentage or time limit is reached then the poll is ended. 

```http
  -majority #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Percentage> <Question>
```

#### Conviction

Conviction voting allows the user to vote using either ['👍', '👎'] as their reaction. The user can choose to change
there vote at any time before the poll hits the time limit; however, the longer a user casts a vote for the more weight is place on their vote. For example: This conviction vote is set to expire in 60secs with 4 intervals and a mulitiplier of 2, then the voter has the ability to cast a vote in 4 different time intervals (60secs/4 intervals). If they user cast their vote early, in the first interval, then their vote gets multiplied by 2 with every interval that passes so the vote that would have counted as 1 is actually 16 by the time the vote is over. If they recast their vote lets say, in the 3rd interval then the multiplier would only occur twice and their vote would count for less than if they had cast it early. 

```http
  -conviction #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Intervals> <Multiplier> <Question>
```

#### Quadratic

Quadratic voting gives a voter a certain amount of votes to cast and how strongly a user feels about the proposal is how many votes they will cast. 
They are allowed to pick from this set of reactions ['👍', '😀', '🤠','😗','😉']. Then tracks the number
of reactions members have given to an active proposal. The reaction limit that we have set is currently set to 5 options or less but more can be added easily. 

```http
  -quadratic #<Guild ID/Name> @<Specified Role> <Time Limit (secs)> <Reaction Limit> <Question>
```
