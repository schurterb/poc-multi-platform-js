import random
import bisect
import argparse

# assuming you have data in following format: {"name": tickets}
def read_donations(file_name):
    donations = {}
    with open(file_name, 'r') as f:
        for line in f:
            user, tickets = line.strip().split(': ')
            donations[user] = int(tickets)
    return donations

def draw_winner_optimized(donations):
    # create a list of cumulative ticket counts and a separate list of user names
    names = list(donations.keys())
    cumulative_tickets = []
    total_tickets = 0
    for tickets in donations.values():
        total_tickets += tickets
        cumulative_tickets.append(total_tickets)
    
    # draw a random ticket number
    drawn_ticket = random.randint(1, total_tickets)
    
    # find the winner using binary search
    winner_index = bisect.bisect_right(cumulative_tickets, drawn_ticket)
    winner = names[winner_index]
    
    return winner

parser = argparse.ArgumentParser()
parser.add_argument("filename", help="The name of the file to be processed.")
args = parser.parse_args()

donations = read_donations(args.filename)
winner = draw_winner_optimized(donations)
print(f"The winner is {winner}")
