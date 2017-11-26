// Determines positions for railways between two stations
// Will shift each railway for given interspace from the center line between stations

export const determineRailsPosition = (
  fromX,
  fromY,
  toX,
  toY,
  railsInterspace
) => {
  const halfDistance = railsInterspace / 2
  const angleCorrection = railsInterspace * 0.15

  // Horizontal rails
  if (fromY === toY) {
    const lineA = {
      fromX,
      fromY: fromY - halfDistance,
      toX,
      toY: toY - halfDistance
    }
    const lineB = {
      fromX,
      fromY: fromY + halfDistance,
      toX,
      toY: toY + halfDistance
    }

    return fromX < toX ? [lineA, lineB] : [lineB, lineA]
  }

  // Vertical rails
  if (fromX === toX) {
    const lineA = {
      fromX: fromX - halfDistance,
      fromY,
      toX: toX - halfDistance,
      toY
    }
    const lineB = {
      fromX: fromX + halfDistance,
      fromY,
      toX: toX + halfDistance,
      toY
    }

    return fromY > toY ? [lineA, lineB] : [lineB, lineA]
  }

  // Diagonal rails
  if (fromY < toY && fromX < toX) {
    // Top-Left to Bottom-Right
    return [
      {
        fromX: fromX + halfDistance - angleCorrection,
        fromY: fromY - halfDistance + angleCorrection,
        toX: toX + halfDistance - angleCorrection,
        toY: toY - halfDistance + angleCorrection
      },
      {
        fromX: fromX - halfDistance + angleCorrection,
        fromY: fromY + halfDistance - angleCorrection,
        toX: toX - halfDistance + angleCorrection,
        toY: toY + halfDistance - angleCorrection
      }
    ]
  } else if (fromX > toX && fromY > toY) {
    // Bottom-Right to Top-Left
    return [
      {
        fromX: fromX - halfDistance + angleCorrection,
        fromY: fromY + halfDistance - angleCorrection,
        toX: toX - halfDistance + angleCorrection,
        toY: toY + halfDistance - angleCorrection
      },
      {
        fromX: fromX + halfDistance - angleCorrection,
        fromY: fromY - halfDistance + angleCorrection,
        toX: toX + halfDistance - angleCorrection,
        toY: toY - halfDistance + angleCorrection
      }
    ]
  } else {
    // Bottom-Left to Top-Right
    const lineA = {
      fromX: fromX - halfDistance + angleCorrection,
      fromY: fromY - halfDistance + angleCorrection,
      toX: toX - halfDistance + angleCorrection,
      toY: toY - halfDistance + angleCorrection
    }
    const lineB = {
      fromX: fromX + halfDistance - angleCorrection,
      fromY: fromY + halfDistance - angleCorrection,
      toX: toX + halfDistance - angleCorrection,
      toY: toY + halfDistance - angleCorrection
    }

    return fromX < toX && fromY > toY ? [lineA, lineB] : [lineB, lineA]
  }
}
