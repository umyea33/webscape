import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import levelData from '../assets/levels/level1.json';

const NODE_RADIUS = 8;
const ARROW_SIZE = 8;

interface NodeData {
  id: string;
  x: number;
  y: number;
  neighbors: string[];
}

interface LevelData {
  level: number;
  graph: {
    width: number;
    height: number;
    nodes: NodeData[];
  };
}

function getArrowHead(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): string {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;

  const tipX = toX - ux * NODE_RADIUS;
  const tipY = toY - uy * NODE_RADIUS;

  const baseX = tipX - ux * ARROW_SIZE;
  const baseY = tipY - uy * ARROW_SIZE;

  const leftX = baseX - uy * (ARROW_SIZE / 2);
  const leftY = baseY + ux * (ARROW_SIZE / 2);
  const rightX = baseX + uy * (ARROW_SIZE / 2);
  const rightY = baseY - ux * (ARROW_SIZE / 2);

  return `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`;
}

function LevelScreen(): React.JSX.Element {
  const data = levelData as LevelData;
  const { width, height, nodes } = data.graph;

  const nodeMap = new Map<string, NodeData>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {nodes.map(node =>
          node.neighbors.map(neighborId => {
            const neighbor = nodeMap.get(neighborId);
            if (!neighbor) {
              return null;
            }
            return (
              <React.Fragment key={`${node.id}-${neighborId}`}>
                <Line
                  x1={node.x}
                  y1={node.y}
                  x2={neighbor.x}
                  y2={neighbor.y}
                  stroke="#888"
                  strokeWidth={2}
                />
                <Polygon
                  points={getArrowHead(node.x, node.y, neighbor.x, neighbor.y)}
                  fill="#888"
                />
              </React.Fragment>
            );
          }),
        )}
        {nodes.map(node => (
          <Circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill="#4A90D9"
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LevelScreen;
