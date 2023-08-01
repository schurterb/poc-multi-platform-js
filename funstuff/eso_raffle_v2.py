import random
import bisect
import tkinter as tk
from tkinter import simpledialog, messagebox

def parse_donations(text):
    donations = {}
    lines = text.strip().split('\n')
    for line in lines:
        user, tickets = line.strip().split(': ')
        donations[user] = int(tickets)
    return donations

def draw_winner_optimized(donations):
    names = list(donations.keys())
    cumulative_tickets = []
    total_tickets = 0
    for tickets in donations.values():
        total_tickets += tickets
        cumulative_tickets.append(total_tickets)
    drawn_ticket = random.randint(1, total_tickets)
    winner_index = bisect.bisect_right(cumulative_tickets, drawn_ticket)
    winner = names[winner_index]
    return winner

def select_button_click():
    text = input_text.get("1.0", "end-1c")
    donations = parse_donations(text)
    winner = draw_winner_optimized(donations)
    result_text.set(f"The winner is {winner}")

root = tk.Tk()
input_text = tk.Text(root, width=50, height=10)
input_text.pack()

select_button = tk.Button(root, text="Select Winner", command=select_button_click)
select_button.pack()

result_text = tk.StringVar()
result_label = tk.Label(root, textvariable=result_text)
result_label.pack()

root.mainloop()
