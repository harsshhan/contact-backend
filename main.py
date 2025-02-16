# def print_board(board):
#     for row in board:
#         print(" | ".join(row))
#         print("-" * 9)

# def check_winner(board, player):
#     for i in range(3):
#         if all(board[i][j] == player for j in range(3)) or all(board[j][i] == player for j in range(3)):
#             return True
#     if all(board[i][i] == player for i in range(3)) or all(board[i][2 - i] == player for i in range(3)):
#         return True
#     return False

# def is_full(board):
#     return all(board[i][j] != " " for i in range(3) for j in range(3))

# def tic_tac_toe():
#     board = [[" " for _ in range(3)] for _ in range(3)]
#     players = ["X", "O"]
#     turn = 0
    
#     while True:
#         print_board(board)
#         row, col = map(int, input(f"Player {players[turn % 2]}, enter row and column (0-2): ").split())
        
#         if board[row][col] == " ":
#             board[row][col] = players[turn % 2]
            
#             if check_winner(board, players[turn % 2]):
#                 print_board(board)
#                 print(f"Player {players[turn % 2]} wins!")
#                 break
            
#             if is_full(board):
#                 print_board(board)
#                 print("It's a draw!")
#                 break
            
#             turn += 1
#         else:
#             print("Cell already taken, try again.")

# if __name__ == "__main__":
#     tic_tac_toe()



# from collections import deque

# def bfs(graph, start):
#     visited = set()
#     queue = deque([start])

#     while queue:
#         node = queue.popleft()
#         if node not in visited:
#             print(node, end=" ")
#             visited.add(node)
#             queue.extend(graph[node])  

# graph = {
#     'A': ['B', 'C'],
#     'B': ['D', 'E'],
#     'C': ['F'],
#     'D': [],
#     'E': ['F'],
#     'F': []
# }

# start_node = 'A'
# print("BFS Traversal:")
# bfs(graph, start_node)





from collections import deque

def dfs(node, graph, visited):
    print(node, end=" ")
    visited[node] = True
    for neighbor in sorted(graph[node]):  # Sort for consistent order
        if not visited[neighbor]:
            dfs(neighbor, graph, visited)

def bfs(start, graph):
    queue = deque([start])
    visited = {key: False for key in graph}
    visited[start] = True

    while queue:
        node = queue.popleft()
        print(node, end=" ")
        for neighbor in sorted(graph[node]):  # Sort for consistent order
            if not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True

# Input
N, M = map(int, input().split())
graph = {i: [] for i in range(1, N + 1)}

for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

S = int(input())

# DFS
visited = {key: False for key in graph}
print("DFS:", end=" ")
dfs(S, graph, visited)
print()

# BFS
print("BFS:", end=" ")
bfs(S, graph)
print()